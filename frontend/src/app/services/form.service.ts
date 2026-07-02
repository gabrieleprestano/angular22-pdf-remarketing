import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable, of } from 'rxjs';

import type { ReportData } from '../models/report.types';
import type { PeriziaReportData } from '../models/perizia.types';

@Service()
export class FormService {
    private http = inject(HttpClient);

    private readonly API_URL = 'http://localhost:3000/api/v1';
    private readonly GENERATE_PDF_URL = `${this.API_URL}/build/generate-pdf`;

    generatePDF(formData: ReportData | PeriziaReportData): Observable<Blob> {
        return this.http.post(this.GENERATE_PDF_URL, formData, { responseType: 'blob' }).pipe(
            tap((blob: Blob) => {
                if (blob) {
                    // Creating a URL for the Blob object
                    const blobUrl = window.URL.createObjectURL(blob);

                    // Creating a temporary link to trigger the download
                    const link = document.createElement('a');
                    link.href = blobUrl;

                    // Setting the download attribute with a filename
                    link.download = `perizia_report_${Date.now()}.pdf`;
                    link.click();

                    // Opening the PDF in a new tab
                    window.open(blobUrl, '_blank');

                    // Cleaning up the memory
                    setTimeout(() => {
                        window.URL.revokeObjectURL(blobUrl);
                    }, 100);
                }
            }), catchError((error) => {
                if (error instanceof Error) {
                    console.error('An error occurred while generating PDF:', error.message);
                    return of(new Blob());
                } else {
                    console.error('An unexpected error occurred while generating PDF:', error);
                    return of(new Blob());
                }
            }));
    }
}
