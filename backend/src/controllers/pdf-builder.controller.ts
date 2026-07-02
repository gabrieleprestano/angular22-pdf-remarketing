import type { Request, Response } from 'express';

// Midules & Libraries
import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';

// Types
import type { PeriziaReportData, Controllo, Danno } from '../models/perizia.types.js';

// Middlewares
import type Multer from 'multer';

// Utility functions
import * as utils from '../utils/utils.imports_index.js';

export const generatePdf = async (req: Request, res: Response): Promise<void> => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    try {
        let data: PeriziaReportData;

        // Extracting the JSON data from the request body or from the uploaded file
        if (files?.['jsonFile']?.[0]) {
            // If a JSON file is uploaded, read and parse it
            const jsonBuffer = fs.readFileSync(files['jsonFile'][0].path, 'utf-8');
            data = JSON.parse(jsonBuffer);
        } else if (req.body && Object.keys(req.body).length > 0) {
            // If the request body is sent as textual form-data or raw JSON
            data = typeof req.body.adz_data === 'string' ? JSON.parse(req.body.adz_data) : req.body;
        } else {
            res.status(400).json({ error: "Nessun dato o file JSON ricevuto per la generazione del PDF." });
            return;
        }

        // Security check: Ensure that the essential 'adz_data.adz' object exists in the parsed data
        if (!data || !data.adz_data || !data.adz_data.adz) {
            res.status(400).json({ error: "La struttura del JSON non contiene l'oggetto obbligatorio adz_data.adz." });
            return;
        }

        // Extracting 'controlliAlRientro' and 'danniVeicolo' from the request body, ensuring they are parsed correctly
        let controlliEstratti: Controllo[] = data.controlli || [];
        if (req.body.controlliAlRientro) {
            controlliEstratti = typeof req.body.controlliAlRientro === 'string'
                ? JSON.parse(req.body.controlliAlRientro)
                : req.body.controlliAlRientro;
        }

        let danniEstratti: Danno[] = data.adz_data.adz.danni || [];
        if (req.body.danniVeicolo) {
            danniEstratti = typeof req.body.danniVeicolo === 'string'
                ? JSON.parse(req.body.danniVeicolo)
                : req.body.danniVeicolo;
        }

        // Reading the HTML template from the assets folder
        const templatePath = path.resolve('src/assets/template.html');

        if (!fs.existsSync(templatePath)) {
            res.status(404).json({ error: "File template.html non trovato negli assets!" });
            return;
        }

        let htmlContent = fs.readFileSync(templatePath, 'utf-8');

        // Loading static images as Base64
        const logoAziendaleBase64 = utils.loadImageAsBase64('src/assets/images/logo_gg.webp');
        const tyresCarModelImage = utils.loadImageAsBase64('src/assets/images/car-model.webp');

        // Processing dynamic images uploaded from Angular via Multer
        const fotoPrincipaleBase64 = data.fotoPrincipale || (files?.['fotoPrincipale']?.[0] ? utils.multerFileToBase64(files['fotoPrincipale'][0]) : undefined);

        // Mapping over the 'danni' array to enrich each damage entry with its corresponding photo in Base64 format
        const danniArricchiti = (data.adz_data.adz.danni || []).map((d: Danno) => {
            // Finding the corresponding file in the Multer files array based on the 'codice_ricambio' of the damage entry
            const fileFisico = files?.['fotoDanni']?.find(f =>
                f.originalname.includes(d.codice_ricambio)
            );

            // If a photo is found, convert it to Base64; otherwise, use the existing 'fotoDanno' from the JSON data or leave it undefined
            const fotoDannoBase64 = d.fotoDanno || (fileFisico ? utils.multerFileToBase64(fileFisico) : undefined);

            return {
                ...d,
                fotoDanno: fotoDannoBase64
            };
        });

        // Generating HTML for controlli, danni table rows, and damage cards
        const controlliHtml = utils.generateControlliHtml(data.controlli || []);
        const tabellaDanniHtml = utils.generateDanniTableRows(danniArricchiti);
        const damageCardsHtml = utils.generateDamageCardsHtml(danniArricchiti);

        const adzMain = data.result || data;

        // =======================================================
        // 1. FOTO VETRINA (8 elementi) - PUNTA A result.fotoVetrina
        // =======================================================
        const fotoVetrinaSorgente = adzMain.fotoVetrina || [];
        const fotoVetrinaValideDalJson = fotoVetrinaSorgente.filter((f: any) =>
            f && (f.thumb || (f.url && !f.url.includes('img=undefined') && !f.url.includes('img=null')))
        );

        const fotoVetrinaNormalizzate: (string | undefined)[] = Array(8).fill(undefined).map((_, i) => {
            const fotoJson = fotoVetrinaValideDalJson[i];
            if (fotoJson) {
                // Prende prima il base64 (thumb) se c'è, altrimenti l'URL remoto
                return fotoJson.thumb || fotoJson.url;
            }
            if (files?.['fotoVetrina']?.[i]) {
                return utils.multerFileToBase64(files['fotoVetrina'][i]);
            }
            return undefined;
        });
        const fotoVetrinaHtml = utils.generatePhotoGridHtml(fotoVetrinaNormalizzate, 8);


        // =======================================================
        // 2. ALTRI ELEMENTI (12 elementi) - PUNTA A result.altriElementi
        // =======================================================
        const altriElementiSorgente = adzMain.altriElementi || [];
        const altriElementiValidiDalJson = altriElementiSorgente.filter((f: any) =>
            f && (f.thumb || (f.url && !f.url.includes('img=undefined') && !f.url.includes('img=null')))
        );

        const altriElementiNormalizzati: (string | undefined)[] = Array(12).fill(undefined).map((_, i) => {
            const fotoJson = altriElementiValidiDalJson[i];
            if (fotoJson) {
                return fotoJson.thumb || fotoJson.url;
            }
            if (files?.['altriElementi']?.[i]) {
                return utils.multerFileToBase64(files['altriElementi'][i]);
            }
            return undefined;
        });
        const altriElementiHtml = utils.generatePhotoGridHtml(altriElementiNormalizzati, 12);


        // =======================================================
        // 3. DOCUMENTI (2 elementi) - PUNTA A result.documenti
        // =======================================================
        const documentiSorgente = adzMain.documenti || [];
        const documentiValidiDalJson = documentiSorgente.filter((f: any) =>
            f && (f.thumb || (f.url && !f.url.includes('img=undefined') && !f.url.includes('img=null')))
        );

        const documentiNormalizzati: (string | undefined)[] = Array(2).fill(undefined).map((_, i) => {
            const fotoJson = documentiValidiDalJson[i];
            if (fotoJson) {
                return fotoJson.thumb || fotoJson.url;
            }
            if (files?.['documenti']?.[i]) {
                return utils.multerFileToBase64(files['documenti'][i]);
            }
            return undefined;
        });
        const documentiHtml = utils.generatePhotoGridHtml(documentiNormalizzati, 2);


        // Copertina principale (usa la prima foto valida della vetrina della macchina)
        const fotoPrincipaleUrl = fotoVetrinaNormalizzate[0] || undefined;

        // Replacements for placeholders in the HTML template
        const rimpiazzi: Record<string, string> = {
            logoAzienda: logoAziendaleBase64,
            carModelImage: tyresCarModelImage,

            /**
             * Legenda
             * ⚠️: MANCANTE NEL JSON = il campo non è presente nel file JSON, quindi viene sostituito con un placeholder o un valore di default.
             */

            // Intestazione
            periziaNr: data.nPerizia,
            categoria: utils.takeFirstValueFromObject(data.categoria ?? '—'), // ⚠️
            targa: data.targa,
            dataIncarico: utils.extractDateFromString(utils.takeFirstValueFromObject(data.adz_data.adz.data_incarico)),
            primoRilievo: utils.extractDateFromString(utils.takeFirstValueFromObject(data.adz_data.adz.data_1_rilievo)),
            localita: utils.takeFirstValueFromObject(data.adz_data.adz.localita),

            // Veicolo
            marca: data.marca,
            modello: data.modello,
            versione: data.versione,
            telaio: data.telaio,
            colore: utils.takeFirstValueFromObject(data.adz_data.adz.colore),
            immatricolazione: utils.extractDateFromString(utils.takeFirstValueFromObject(data.adz_data.adz.prima_immatricolazione)),
            cilindrata: utils.takeFirstValueFromObject(data.cilindrata ?? '—'), // ⚠️
            potenza: utils.takeFirstValueFromObject(data.potenza ?? '—'), // ⚠️
            alimentazione: utils.takeFirstValueFromObject(data.alimentazione ?? '—'), // ⚠️
            co2: utils.takeFirstValueFromObject(data.co2 ?? '—'), // ⚠️
            km: String(data.km),
            cavalliFiscali: utils.takeFirstValueFromObject(data.cavalliFiscali ?? '—'), // ⚠️
            consumo: utils.takeFirstValueFromObject(data.consumo ?? '—'), // ⚠️
            listino: utils.takeFirstValueFromObject(data.listino ?? '—'), // ⚠️

            // Nuovi campi aggiunti il 30/6/26 / 01/6/26
            codice: String(data.codiceCentro),
            agenzia: data.urRagSoc,
            riparazioni: utils.takeFirstValueFromObject(data.adz_data.adz.riparazioni) || 'Non Disponibile',
            statoUso: utils.takeFirstValueFromObject(data.adz_data.adz.stato_d_uso) || 'Non Disponibile',
            tipoSmalto: utils.takeFirstValueFromObject(data.adz_data.adz.tipo_smalto) || '—',

            // Pneumatici ⚠️
            antSx: utils.takeFirstValueFromObject(data.adz_data.adz.pneumatici),
            antDx: utils.takeFirstValueFromObject(data.adz_data.adz.pneumatici),
            postSx: utils.takeFirstValueFromObject(data.adz_data.adz.pneumatici),
            postDx: utils.takeFirstValueFromObject(data.adz_data.adz.pneumatici),
            // badgeEstivoClass: data.tipoPneumatico === 'Estivo' ? 'active' : '', ⚠️
            // badgeAllSeasonClass: data.tipoPneumatico === 'All Season' ? 'active' : '', ⚠️
            // badgeWinterClass: data.tipoPneumatico === 'Winter' ? 'active' : '', ⚠️

            // Costi e totali
            listinoData: utils.takeFirstValueFromObject(data.adz_data.adz.listino_ricambi_aggiornato_a) || '—',
            fasciaTempi: utils.takeFirstValueFromObject(data.adz_data.adz.fascia_carrozzeria) || '—',
            totaleRicambi: utils.formatDecimal(data.adz_data.adz.ricambi_ivato) + ' €',
            supplDoppioStrato: utils.formatDecimal(data.adz_data.adz.supplemento_doppio_strato) + ' €',
            supplFinitura: utils.formatDecimal(data.adz_data.adz.supplemento_finitura) + ' €',
            tempoVerniciatura: utils.formatDecimal(data.adz_data.adz.tempo_agg_per_verniciatura) + ' h',
            totTempiSuppl: utils.formatDecimal(data.adz_data.adz.totale_tempi_suppl) + ' h',
            totTempiVe: utils.formatDecimal(data.adz_data.adz.totale_tempi_ve) + ' h',
            ricambi: utils.formatDecimal(data.adz_data.adz.ricambi_imponibile),
            matConsumo: utils.formatDecimal(data.adz_data.adz.materiali_di_consumo),
            moCarroz: utils.formatDecimal(data.adz_data.adz.ore_mdo_carrozzeria),
            iva: utils.formatDecimal(data.adz_data.adz.ricambi_iva),
            totaleDanni: utils.formatDecimal(data.adz_data.adz.totale_sinistra) || '—',

            // Blocchi di codice HTML generati dinamicamente
            fotoPrincipale: fotoPrincipaleUrl || 'https://via.placeholder.com/175x130?text=Manca+Foto',
            BLOCCO_CONTROLLI: controlliHtml,
            RIGHE_TABELLA_DANNI: tabellaDanniHtml,
            FOTO_VETRINA_GRID: fotoVetrinaHtml,
            ALTRI_ELEMENTI_GRID: altriElementiHtml,
            DOCUMENTI_GRID: documentiHtml,
            CARDS_DETTAGLIO_DANNI: damageCardsHtml
        };

        // Substing the placeholders in the HTML template with actual data
        for (const chiave in rimpiazzi) {
            htmlContent = htmlContent.split(`{{${chiave}}}`).join(rimpiazzi[chiave]);
        }

        // Puppeteer to generate the PDF from the final HTML content
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
        await page.waitForNetworkIdle({ idleTime: 500, concurrency: 0 });

        const marginPositions = {
            top: '0',
            bottom: '0',
            left: '0',
            right: '0'
        };

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: marginPositions
        });

        await browser.close();

        // Files cleanup after every PDF generation to avoid storage issues and maintain server hygiene
        utils.cleanupMulterFiles(files);

        // Sending the generated PDF as a response to the client
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=perizia_${data.targa}.pdf`);
        res.status(200).send(pdfBuffer);
    } catch (error) {
        utils.cleanupMulterFiles(files);

        if (error instanceof SyntaxError) {
            res.status(400).json({ error: "Errore di parsing JSON nei dati inviati. Controlla la struttura dei dati." });
        } else if (error instanceof Error) {
            console.error('Errore durante la generazione del PDF su Express:', error);
            res.status(500).json({ error: 'Errore interno del server durante la compilazione del PDF.' });
        } else {
            res.status(500).json({ error: "Errore interno del server sconosciuto." });
        }
    }
};