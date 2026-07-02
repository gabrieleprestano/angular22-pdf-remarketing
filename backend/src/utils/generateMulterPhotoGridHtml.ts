import { multerFileToBase64 } from "./multerFileToBase64.js";

export function generateMulterPhotoGridHtml(files: Express.Multer.File[] | undefined, placeholderCount: number): string {
    let html = '<div class="photo-grid">';

    // If no files are provided, we will use the placeholder count to generate empty placeholders
    const uploadedFiles = files && files.length > 0 ? files : [];
    const totalCount = Math.max(uploadedFiles.length, placeholderCount);

    for (let i = 0; i < totalCount; i++) {
        const file = uploadedFiles[i];

        if (file) {
            const b64 = multerFileToBase64(file);
            html += `<div class="photo-wrapper"><img src="${b64}" /></div>`;
        } else {
            html += `<div class="photo-wrapper placeholder"><span>Nessuna Foto</span></div>`;
        }
    }
    html += '</div>';
    return html;
}