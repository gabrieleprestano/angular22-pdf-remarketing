import type { Danno } from "../models/perizia.types.js";
import { formatDecimal } from "./formatDecimal.js";
import { takeFirstValueFromObject } from "./takeFirstValueFromObject.js";

export function generateDamageCardsHtml(danni: Danno[]): string {
    return danni.map(d => {
        // Se d.fotoDanno esiste ed è valido mostra l'immagine, 
        // altrimenti mostra il box placeholder "No Photo"
        const fotoHtml = (d.fotoDanno && d.fotoDanno.trim() !== '' && d.fotoDanno.trim() !== 'undefined' && d.fotoDanno.trim() !== 'null')
            ? `<div class="card-photo-box"><img src="${d.fotoDanno}" /></div>`
            : `<div class="card-photo-box placeholder"><span>No Photo</span></div>`;

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