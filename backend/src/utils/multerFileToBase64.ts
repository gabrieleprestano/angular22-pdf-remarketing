import fs from 'fs';

export function multerFileToBase64(file: Express.Multer.File | undefined): string {
    if (!file || !fs.existsSync(file.path)) return '';

    const data = fs.readFileSync(file.path);

    return `data:${file.mimetype};base64,${data.toString('base64')}`;
}