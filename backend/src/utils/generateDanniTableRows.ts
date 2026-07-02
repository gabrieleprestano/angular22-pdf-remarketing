import type { Danno } from "../models/perizia.types.js";
import { formatDecimal } from "./formatDecimal.js";
import { takeFirstValueFromObject } from "./takeFirstValueFromObject.js";

export function generateDanniTableRows(danni: Danno[]): string {
    if (danni.length === 0) return `<tr><td colspan="9" class="text-center">Nessun danno rilevato</td></tr>`;

    return danni.map(d => `
        <tr style="border-bottom: 1px solid #f4cdbe; padding: 8px 0; height: 20px;">
            <td style="color: #8f8f90">${takeFirstValueFromObject(d.codice_ricambio)}</td>
            <td>${takeFirstValueFromObject(d.voce_di_danno)}</td>
            <td class="text-center">${takeFirstValueFromObject(d.lato)}</td>
            <td class="text-center">${takeFirstValueFromObject(d.sr_diff)}</td>
            <td class="text-center">${takeFirstValueFromObject(d.la_diff)}</td>
            <td class="text-center">${takeFirstValueFromObject(d.ve_diff)}</td>
            <td class="text-center">${takeFirstValueFromObject(d.me_tempo)}</td>
            <td class="text-center">${takeFirstValueFromObject(d.detraz_sconto)}</td>
            <td class="text-right bold">${formatDecimal(d.costo_ricambi_imponibile?.val || d.costo_ricambi_imponibile)} €</td>
        </tr>
    `).join('');
}