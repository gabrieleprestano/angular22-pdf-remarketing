import { takeFirstValueFromObject } from "./takeFirstValueFromObject.js";

export const formatDecimal = (obj: any): string => {
    const valStr = takeFirstValueFromObject(obj);
    if (valStr === '—') return '—';

    // Rimuove eventuali spazi o zeri inutili all'inizio, gestendo stringhe numeriche
    let parsed = parseFloat(valStr);

    // Se il backend manda i centesimi senza virgola (es: "00045" per dire 45.00 o 0.45), 
    // adatta la divisione di conseguenza. Se è un numero normale con o senza decimali:
    if (isNaN(parsed)) return valStr;

    return parsed.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};