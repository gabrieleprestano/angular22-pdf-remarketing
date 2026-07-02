import type { Danno } from "../models/perizia.types.js";
import { formatDecimal } from "./formatDecimal.js";
import { takeFirstValueFromObject } from "./takeFirstValueFromObject.js";

export function generateDamageCardsHtml(danni: Danno[]): string {
    return danni.map(d => {
        const fotoHtml = d.fotoDanno
            ? `<div class="card-photo-box"><img src="${d.fotoDanno}" /></div>`
            : '';

        return `
            <div class="damage-card">
                <div class="card-left-accent"></div>
                <div class="card-body">
                    <div class="card-main-info">
                        <div class="card-meta">
                            <span class="card-cr">${takeFirstValueFromObject(d.codice_ricambio)}</span>
                            <span class="card-voce">${takeFirstValueFromObject(d.voce_di_danno)}</span>
                        </div>
                        <div class="card-op-tipo">${takeFirstValueFromObject(d.tipoOp ?? '—')}</div>
                        <div class="card-tempi">${takeFirstValueFromObject(d.tempiDetail ?? '—')}</div>
                        <div class="card-calcolo">${takeFirstValueFromObject(d.calcolo ?? '—')}</div>
                    </div>
                    <div class="card-right-side">
                        <div class="card-costo-totale">${formatDecimal(d.costoDetail ?? '—')} €</div>
                        ${fotoHtml}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}