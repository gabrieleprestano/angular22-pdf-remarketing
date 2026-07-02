import { Router } from 'express';
import { generatePdf } from '../controllers/pdf-builder.controller.js';
import multer from 'multer';

const pdfBuilderRoutes: Router = Router();

const upload = multer({ dest: 'uploads/' });

pdfBuilderRoutes.post(
    '/generate-pdf',
    upload.fields([
        { name: 'fotoPrincipale', maxCount: 1 },
        { name: 'fotoVetrina', maxCount: 8 },
        { name: 'altriElementi', maxCount: 12 },
        { name: 'documenti', maxCount: 2 },
        { name: 'fotoDanni', maxCount: 10 },
        { name: 'jsonFile', maxCount: 1 },
    ]),
    generatePdf
);

export default pdfBuilderRoutes;