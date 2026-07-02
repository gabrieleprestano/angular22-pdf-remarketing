import type { Controllo } from "../models/report.types.js";

export function generateControlliHtml(controlli: Controllo[]): string {
    if (!controlli || controlli.length === 0) {
        return `<div class="text-center">Nessun controllo rilevato</div>`;
    }

    const half = Math.ceil(controlli.length / 2);
    const col1 = controlli.slice(0, half);
    const col2 = controlli.slice(half);

    const mapItem = (c: Controllo) => `
        <div class="controllo-item">
            <span class="controllo-voce">${c.voce}</span>
            <span class="controllo-pallino ${c.conforme ? 'conforme' : 'non-conforme'}">●</span>
        </div>
    `;

    return `
        <div class="controlli-col">${col1.map(mapItem).join('')}</div>
        <div class="controlli-col">${col2.map(mapItem).join('')}</div>
    `;
}