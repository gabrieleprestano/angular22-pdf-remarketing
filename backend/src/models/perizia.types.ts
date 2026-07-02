export interface PeriziaReportData {
    id: number;
    targa: string;
    telaio: string;
    stato: string;
    stato1: string;
    tipoVeicolo: string;
    marca: string;
    annoImmatricolazione: number;
    modello: string;
    versione: string;
    deposito: string;
    tipo: string;
    nPerizia: string;
    km: number;
    provincia: string;
    citta: string;
    cap: string;
    indirizzo: string;
    location_lat: number;
    location_lon: number;
    noteCarico: string;
    danneggiato_nome: string;
    danneggiato_contatto: string;
    danneggiato_provincia: string;
    danneggiato_citta: string;
    danneggiato_cap: string;
    danneggiato_indirizzo: string;
    danneggiato_telefono: string;
    danneggiato_fax: string;
    danneggiato_email: string;
    danneggiato_pec: string;
    patrocinatore_nome: string;
    patrocinatore_contatto: string;
    patrocinatore_telefono: string;
    patrocinatore_provincia: string;
    patrocinatore_citta: string;
    patrocinatore_cap: string;
    patrocinatore_indirizzo: string;
    patrocinatore_fax: string;
    patrocinatore_email: string;
    patrocinatore_pec: string;
    sinistro_numero: string;
    partita_danno: number;
    sinistro_mandante: string;
    sinistro_data: null;
    sinistro_targaAssicurato: string;
    sinistro_nomeAssicurato: string;
    sinistro_provincia: string;
    sinistro_citta: string;
    sinistro_cap: string;
    sinistro_indirizzo: string;
    sinistro_location_lat: number;
    sinistro_location_lon: number;
    dtaAppuntamento: Date;
    allegatiIncarico: any[];
    allegati: Allegati[];
    creatoDa: string;
    assegnatoA1: string;
    assegnatoA2: string;
    cliente: number;
    adz_data: AdzData;
    idFleet: null;
    calendarEventId: string;
    timeRequired: number;
    commessa: number;
    formVal1: FormVal;
    formVal2: string;
    formVal3: string;
    formVal4: string;
    formVal5: string;
    interlocutorie: any[];
    idFirebase: null;
    importo_proposta: number;
    proposte: any[];
    iban_proposta: null;
    concordati: any[];
    importo_concordato: number;
    riparatore_nome: string;
    riparatore_tel: string;
    riparatore_email: string;
    fotoComplete: boolean;
    noteInterne: string;
    adz_data_mdo_meccanica_imp: number;
    adz_data_ricambi_imponibile: number;
    adz_data_materiali_di_consumo: number;
    adz_data_totale_mano_d_opera_carrozzeria: number;
    adz_data_uso_dime_imp: number;
    adz_data_importo_concordato: string;
    direct: number;
    direct_usertType: string;
    costo: number;
    ricavo: number;
    documentale: boolean;
    costo_manuale: null;
    ricavo_manuale: number;
    descrizione_cambio_tariffa: string;
    rif_fatt_attiva: string;
    data_fatt_attiva: null;
    rif_fatt_passiva: string;
    data_fatt_passiva: null;
    valutazione_etax: string;
    codiceCentro: number;
    madTarga: string;
    urCodiceCliente: string;
    urRagSoc: string;
    urCodContratto: string;
    urScadenzaContratto: Date;
    urMaxRiaddebitabile: string;
    urContrattoQuadroSifa: number;
    tipo_veicolo: null;
    marcaDescr: null;
    modDescr: null;
    verDescr: null;
    modulo1: null;
    modulo2: null;
    modulo3: null;
    modulo4: null;
    modulo5: null;
    modulo1_descr: null;
    modulo2_descr: null;
    modulo3_descr: null;
    modulo4_descr: null;
    modulo5_descr: null;
    unipolrental_scadenzaContratto: Date;
    ServizioRiconsegna: string;
    noteDeroghe: null;
    ContrattoQuadroSifa: number;
    result: Result;

    // Campi inseriti da report.types.ts e non disponibili nel JSON originale della perizia
    categoria?: string;
    cilindrata?: string;
    potenza?: string;
    alimentazione?: string;
    co2?: string;
    cavalliFiscali?: string;
    consumo?: string;
    listino?: string;
    controlli?: Controllo[];
    fotoPrincipale?: string | undefined;           // foto copertina (pagina 1)
    fotoVetrina?: (string | undefined)[];   // 8 foto (pagina 2)
    altriElementi?: (string | undefined)[];   // 12 foto (pagina 2)
    documenti?: (string | undefined)[];   // 2 foto  (pagina 2)
}

export interface AdzData {
    adz: Adz;
}

export interface Adz {
    danni: Danno[];
    a1: string;
    a2: string;
    a3: string;
    allestimenti_dotazioni: string;
    assi: string;
    assicurato: string;
    a_capo_cod_fisc: string;
    b1: string;
    b2: string;
    b3: string;
    b4: string;
    c1: string;
    c2: string;
    c3: string;
    codice_omologazione: string;
    codice_software_house: string;
    cod_agenzia1: string;
    cod_agenzia2: string;
    cod_liquidatore: string;
    coefficiente_di_riduzione: string;
    coerenza_danno_dinamica1: string;
    coerenza_danno_dinamica2: string;
    colore: string;
    controparte: string;
    costo_mdo_carrozzeria: string;
    costo_mdo_meccanica: string;
    c_o: string;
    d0: string;
    danni_ard_totale_imponibile: string;
    data_1_rilievo: string;
    data_consegna: string;
    data_incarico: string;
    data_sinistro: string;
    detrazione_sui_ricambi_con_asterisco: string;
    e0: string;
    esercizio: string;
    f0: string;
    fascia_carrozzeria: string;
    fermo_tecnico: string;
    firma: string;
    franchigia_scoperto_con_il_max_min_del: string;
    franchigia_scoperto_con_il_max_min_del_perc: string;
    gia_targa: string;
    il_dannegg_recuperare_iva: string;
    importo_concordato: string;
    importo_richiesto: string;
    impresa_controparte: string;
    indennizzo_contrattuale: string;
    indirizzo: string;
    insufficienza_assicurativa: string;
    intestatario: string;
    km: string;
    listino_ricambi_aggiornato_a: string;
    localita: string;
    logo_azienda: string;
    materiali_di_consumo: string;
    materiali_di_consumo_iva: string;
    materiali_di_consumo_ivato: string;
    mdo_meccanica_imp: string;
    mdo_meccanica_iva: string;
    mdo_meccanica_ivato: string;
    nr_isp: string;
    numero_polizza: string;
    n_fotog: string;
    ore_mdo_carrozzeria: string;
    ore_mdo_meccanica: string;
    osservazioni: string;
    passo: string;
    perizia_nr: string;
    pneumatici: string;
    portata: string;
    posti: string;
    prima_immatricolazione: string;
    ramo_sinistro: string;
    relazione_di_perizia_per_la_spett: string;
    ricambi_imponibile: string;
    ricambi_iva: string;
    ricambi_ivato: string;
    riparatore: string;
    riparazioni: string;
    sinistro_numero: string;
    spese_accessorie: string;
    stato_d_uso: string;
    supplemento_doppio_strato: string;
    supplemento_finitura: string;
    tara: string;
    targa: string;
    telaio: string;
    tempo_agg_per_verniciatura: string;
    tipo_smalto: string;
    totale_mano_d_opera_carrozzeria: string;
    totale_mano_d_opera_carrozzeria_iva: string;
    totale_mano_d_opera_carrozzeria_ivato: string;
    totale_sinistra: string;
    totale_tempi_suppl: string;
    totale_tempi_ve: string;
    tot_imponibile_sinistra: string;
    tot_iva_compresa_sinistra: string;
    tot_tempi_la: string;
    tot_tempi_me: string;
    tot_tempi_ricambi: string;
    tot_tempi_sr: string;
    tot_tempi_ve: string;
    uso_dime_iva: string;
    uso_dime_imp: string;
    uso_dime_ivato: string;
    valore_assicurato: string;
    valore_a_nuovo: string;
    valore_commerciale: string;
    valore_per_differenza: string;
    valore_relitto: string;
    veicolo_marca_versione_modello: string;
    versione_listino_ricambi: string;
    totCompleto: number;
    totParziale: number;
}

export interface String {
    val: string;
    layoutX: number | null;
    layoutY: number | null;
    type: A1Type | null;
}

export type A1Type = "-" | "s" | "i" | "nr" | "s10" | "n100" | "d" | "a" | "i1000" | "sisp" | "nr100" | "n";

export interface Danno {
    "*": string;
    codice_ricambio: string;
    costo_ricambi_imponibile: CostoRicambiImponibile;
    detraz_sconto: string;
    lato: string;
    la_diff: string;
    la_tempo: string;
    me_tempo: string;
    sr_diff: string;
    sr_tempo: string;
    ve_diff: string;
    ve_tempo: string;
    voce_di_danno: string;

    // Campi aggiunti per la generazione del PDF da report.types.ts e non disponibili nel JSON originale della perizia
    tipoOp?: string;    // "Sostituzione" | "Verniciatura"
    tempiDetail?: string;    // es. "SR 5,20"
    calcolo?: string;    // es. "Ricambio 342,99 € + 5,20 h × 35,00 €"
    costoDetail?: string;    // es. "524,99 €"
    fotoDanno?: string | undefined;    // base64 foto danno specifico (pagina 3)
}

export interface CostoRicambiImponibile {
    val: number;
    layoutX: number;
    layoutY: number;
    type: A1Type;
}

export interface Allegati {
    fileName: string;
    fileContent: string;
    type: string;
    mime?: string;
    sent?: Date;
    hash: string;
    ext?: string;
    url: string;
    size?: number;
    creationDate?: Date;
    source?: string;
}

export interface FormVal {
}

export interface Result {
    vehType: string;
    dataCreazione: Date;
    geo: Geo;
    fotoVetrina: AltriElementi[];
    altriElementi: AltriElementi[];
    documenti: any[];
    damages: Damage[];
    noDamages: boolean;
    tiresData: TiresData;
    attachments: any[];
    questions: any[];
    index: number;
    formVal1: FormVal;
    formVal2: FormVal;
    formVal3: FormVal;
    formVal4: FormVal;
    formVal5: FormVal;
    completed: boolean;
    transfered: boolean;
    damagesInt: any[];
    glasses: any[];
    wizardData: WizardData;
    damageValue: null;
}

export interface AltriElementi {
    id: number;
    descr?: string;
    category?: Category;
    overlay?: Overlay;
    order?: number;
    selected?: boolean;
    checkTarga?: boolean;
    img?: null | string;
    thumb?: string;
    url: string;
    watermark?: null | string;
    angle?: number | null;
    label?: string;
}

export type Category = "altri_elementi" | "tires" | "foto_vetrina";

export interface Overlay {
    type: "img";
    img: string;
}

export interface Damage {
    severity: string;
    type: string;
    x: number;
    y: number;
    intersect: Intersect;
    objectName: string;
    objectNameEdited: string;
    objUrl: string;
    part: string;
    img1: Img1;
}

export interface Img1 {
    id: null;
    angle: null;
    watermark: null;
    img: string;
    thumb: string;
    url: string;
}

export interface Intersect {
    face: Face;
    point: Point;
}

export interface Face {
    a: number;
    b: number;
    c: number;
    normal: Point;
    materialIndex: number;
}

export interface Point {
    isVector3: boolean;
    x: number;
    y: number;
    z: number;
}

export interface Geo {
    latitude: number;
    longitude: number;
    altitude: number;
    accuracy: number;
    altitudeAccuracy: number;
    heading: null;
    speed: null;
    floorLevel: null;
}

export interface TiresData {
    tires: Tire[];
    spareTireNotPreset: boolean;
    repairKit: boolean;
}

export interface Tire {
    l: number;
    h: number;
    d: number;
    brand: string;
    runflat: boolean;
    type: string;
    mm: number;
    img: AltriElementi[];
}

export interface WizardData {
    startTime: Date;
    version: string;
    isIOS: boolean;
    isAndroid: boolean;
    wrongLicensePlate: boolean;
    endTime: Date;
    endTimeCompleted: Date;
}

// Aggiunta da report.types.ts per la generazione del PDF e non disponibile nel JSON originale della perizia
export interface Controllo {
    voce: string;
    conforme: boolean;
}