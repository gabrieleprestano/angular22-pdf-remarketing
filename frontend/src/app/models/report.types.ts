export type Pneumatico = 'Estivo' | 'All Season' | 'Winter';

export interface Pneumatici {
    antSx: string;
    antDx: string;
    postSx: string;
    postDx: string;
}

export interface Controllo {
    voce: string;
    conforme: boolean;
}

export interface Danno {
    // Colonne tabella pagina 1
    cr: string;
    voce: string;
    sr: string;
    la: string;
    ve: string;
    me: string;
    dm: string;
    costo: string;

    // Card dettaglio pagina 3
    tipoOp: string;    // "Sostituzione" | "Verniciatura"
    tempiDetail: string;    // es. "SR 5,20"
    calcolo: string;    // es. "Ricambio 342,99 € + 5,20 h × 35,00 €"
    costoDetail: string;    // es. "524,99 €"
    fotoDanno?: string | undefined;    // base64 foto danno specifico (pagina 3)
}

export interface ReportData {
    // ── Intestazione ──────────────────────────────────────────
    periziaNr: string;
    targa: string;
    dataIncarico: string;
    primoRilievo?: string;
    localita: string;

    // ── Veicolo ───────────────────────────────────────────────
    modello: string;
    categoria: string;
    versione: string;
    telaio: string;
    colore: string;
    immatricolazione: string;
    cilindrata: string;
    potenza: string;
    alimentazione: string;
    co2: string;
    km: string;
    cavalliFiscali: string;
    consumo: string;
    listino: string;

    // ── Pneumatici ────────────────────────────────────────────
    tipoPneumatico: 'Estivo' | 'All Season' | 'Winter';
    pneumatici: Pneumatici;

    // ── Controlli al rientro ──────────────────────────────────
    controlli: Controllo[];

    // ── Valutazione danni ─────────────────────────────────────
    listinoData?: string;
    danni: Danno[];

    // ── Fascia carrozzeria / supplementi ──────────────────────
    fasciaTempi: string;
    totaleRicambi: string;
    supplDoppioStrato: string;
    supplFinitura: string;
    tempoVerniciatura: string;
    totTempiSuppl: string;
    totTempiVe: string;

    // ── Totali finali ─────────────────────────────────────────
    ricambi: string;
    matConsumo: string;
    moCarroz: string;
    iva: string;
    totaleDanni: string;

    // ── Immagini (base64 o percorso assoluto) ─────────────────
    fotoPrincipale?: string | undefined;           // foto copertina (pagina 1)
    fotoVetrina?: (string | undefined)[];   // 8 foto (pagina 2)
    altriElementi?: (string | undefined)[];   // 12 foto (pagina 2)
    documenti?: (string | undefined)[];   // 2 foto  (pagina 2)
}
