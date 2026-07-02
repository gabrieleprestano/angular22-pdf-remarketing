import path from "path";
import fs from "fs";

export function loadImageAsBase64(filePath: string): string {
    try {
        const abs = path.resolve(filePath);
        if (!fs.existsSync(abs)) return '';

        const data = fs.readFileSync(abs);
        const ext = path.extname(abs).toLowerCase().replace('.', '');
        const mime = ext === 'png' ? 'image/png' : 'image/jpeg';

        return `data:${mime};base64,${data.toString('base64')}`;
    } catch {
        return '';
    }
}