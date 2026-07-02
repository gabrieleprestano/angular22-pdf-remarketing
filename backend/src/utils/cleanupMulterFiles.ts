import fs from "fs";
import type Multer from 'multer';

export function cleanupMulterFiles(files: { [fieldname: string]: Express.Multer.File[] } | undefined): void {
    if (!files) return;

    Object.keys(files).forEach(key => {
        const fileArray = files[key] as Express.Multer.File[];

        fileArray.forEach(file => {
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        });
    });
}