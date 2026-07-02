export function generatePhotoGridHtml(images: (string | undefined | null)[], placeholderCount: number): string {
    let html = '<div class="photo-grid">';

    // We garantee that we will always have at least 4 placeholders, so we take the maximum between the number of images and the placeholder count
    const totalCount = Math.max(images.length, placeholderCount);

    for (let i = 0; i < totalCount; i++) {
        const b64 = images[i];

        // If the image is present (it comes from Angular as base64), we add it to the grid, otherwise we add a placeholder
        if (b64 && b64.trim() !== '') {
            html += `<div class="photo-wrapper"><img src="${b64}" /></div>`;
        } else {
            // Otherwise, keep the original placeholder of the PDF
            html += `<div class="photo-wrapper placeholder"><span>No Photo</span></div>`;
        }
    }
    html += '</div>';
    return html;
}