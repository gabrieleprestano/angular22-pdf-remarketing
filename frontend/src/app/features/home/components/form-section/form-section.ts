import { Component, inject, signal } from '@angular/core';
import { Container } from "../../../../layout/container/container";
import { FormHeader } from "../../../../shared/form-header/form-header";
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Pneumatico } from '../../../../models/report.types';
import { FormService } from '../../../../services/form.service';
import { PeriziaReportData } from '../../../../models/perizia.types';

@Component({
  selector: 'app-form-section',
  imports: [Container, CommonModule, FormHeader, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './form-section.html',
  styleUrl: './form-section.css',
})
export class FormSection {
  private fb = inject(FormBuilder);
  private formService = inject(FormService);

  isLoadingPicture = signal<boolean>(false);

  isLoadingVetrinaIndices = signal<Set<number>>(new Set());
  isLoadingAltriElementiIndices = signal<Set<number>>(new Set());
  isLoadingDocumentiIndices = signal<Set<number>>(new Set());

  controlli_al_rientro = [
    {
      label: "Carta di circolazione",
      name: "carta_di_circolazione",
      id: "carta_di_circolazione",
      type: "checkbox",
      checked: false
    },
    {
      label: "Doppione chiavi + telecomandi",
      name: "doppione_chiavi_telecomandi",
      id: "doppione_chiavi_telecomandi",
      type: "checkbox",
      checked: false
    },
    {
      label: "Libretto uso e circolazione",
      name: "libretto_uso_e_circolazione",
      id: "libretto_uso_e_circolazione",
      type: "checkbox",
      checked: false
    },
    {
      label: "Libretto tagliandi / service",
      name: "libretto_tagliandi_service",
      id: "libretto_tagliandi_service",
      type: "checkbox",
      checked: false
    },
    {
      label: "Codici radio e chiavi",
      name: "codici_radio_e_chiavi",
      id: "codici_radio_e_chiavi",
      type: "checkbox",
      checked: false
    },
    {
      label: "Cavo di ricarica (PHEV)",
      name: "cavo_di_ricarica_phev",
      id: "cavo_di_ricarica_phev",
      type: "checkbox",
      checked: false
    },
    {
      label: "Kit di gonfiaggio / ruotino",
      name: "kit_di_gonfiaggio_ruotino",
      id: "kit_di_gonfiaggio_ruotino",
      type: "checkbox",
      checked: false
    },
    {
      label: "Triangolo + Gilet",
      name: "triangolo_gilet",
      id: "triangolo_gilet",
      type: "checkbox",
      checked: false
    },
    {
      label: "Tappetini",
      name: "tappetini",
      id: "tappetini",
      type: "checkbox",
      checked: false
    },
    {
      label: "Navigatore / multimedia",
      name: "navigatore_multimedia",
      id: "navigatore_multimedia",
      type: "checkbox",
      checked: false
    },
    {
      label: "Pulizia esterna",
      name: "pulizia_esterna",
      id: "pulizia_esterna",
      type: "checkbox",
      checked: false
    },
    {
      label: "Pulizia interna",
      name: "pulizia_interna",
      id: "pulizia_interna",
      type: "checkbox",
      checked: false
    },
  ]

  // Danni Veicolo
  danniVeicolo = this.fb.array<FormGroup>([
    this.createDannoGroup()
  ]);
  fotoDanniFiles: (File | null)[] = [];

  createDannoGroup(): FormGroup {
    return this.fb.group({
      cr: [''],
      voce: [''],
      sr: [''],
      la: [''],
      ve: [''],
      me: [''],
      dm: [''],
      costo: [''],
      tipoOp: ['Verniciatura' as 'Verniciatura' | 'Sostituzione', Validators.required],
      tempiDetail: [''],
      calcolo: [''],
      costoDetail: [''],
      fotoDanno: [undefined]
    });
  }

  // Report Data Form
  reportDataForm: FormGroup = this.fb.group({
    // Intestazione
    periziaNr: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    targa: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{3}[A-Z]{2}$/)]],
    dataIncarico: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)]],
    primoRilievo: ['', Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)],
    localita: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],

    // Veicolo
    modello: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    categoria: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    versione: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    telaio: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    colore: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    immatricolazione: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    cilindrata: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    potenza: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    alimentazione: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    co2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    km: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    cavalliFiscali: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    consumo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    listino: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],

    // Pneumatici
    tipoPneumatico: ['Estivo' as Pneumatico, [Validators.required, Validators.pattern(/^(Estivo|All Season|Winter)$/)]],
    pneumatici: this.fb.group({
      antSx: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      antDx: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      postSx: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      postDx: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]]
    }),

    // Controlli al rientro
    controlliAlRientro: this.fb.array(
      this.controlli_al_rientro.map(controllo => this.fb.group({
        voce: [controllo.label],
        conforme: [controllo.checked]
      }))
    ),

    // Valutazione danni
    listinoData: [''], // TODO: Controllare nel PDF se è obbligatorio o meno
    danniVeicolo: this.danniVeicolo, // FormArray of FormGroups for vehicle damages

    // Fascia carrozzeria / Supplementi
    fasciaTempi: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
    totaleRicambi: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    supplDoppioStrato: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    supplFinitura: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    tempoVerniciatura: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    totTempiSuppl: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    totTempiVe: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],

    // Totali finali
    ricambi: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    matConsumo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    moCarroz: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    iva: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    totaleDanni: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],

    // Immagini (base64 o percorso assoluto)
    fotoPrincipale: [''],
    fotoVetrina: this.fb.array<string | undefined>(Array(8).fill(undefined)),
    altriElementi: this.fb.array<string | undefined>(Array(12).fill(undefined)),
    documenti: this.fb.array<string | undefined>(Array(2).fill(undefined))
  });

  // Form Errors
  showErrors(formControlName: string): string {
    const control = this.reportDataForm.get(formControlName);

    if (!control || !control.touched) return '';

    if (control.hasError('required')) {
      return 'Campo obbligatorio';
    }
    if (control.hasError('minlength')) {
      return `Minimo ${control.getError('minlength').requiredLength} caratteri`;
    }
    if (control.hasError('maxlength')) {
      return `Massimo ${control.getError('maxlength').requiredLength} caratteri`;
    }
    if (control.hasError('pattern')) {
      return 'Formato non valido';
    }
    if (control.hasError('email')) {
      return 'Email non valida';
    }
    if (control.hasError('min')) {
      return `Valore minimo: ${control.getError('min').min}`;
    }
    if (control.hasError('max')) {
      return `Valore massimo: ${control.getError('max').max}`;
    }
    return '';
  }

  addDanno() {
    this.danniVeicolo.push(this.createDannoGroup());
    this.fotoDanniFiles.push(null);
  }

  removeDanno(index: number) {
    this.danniVeicolo.removeAt(index);
    this.fotoDanniFiles.splice(index, 1);
  }

  onDamagePicSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;

    const file = input.files ? input.files[0] : null;

    // Store the selected file in the corresponding index of the fotoDanniFiles array
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // It contains the base64 string of the image, which can be used to display the image in the UI or send it to the backend.
        this.danniVeicolo.at(index).patchValue({ fotoDanno: reader.result as string });
      };
      reader.readAsDataURL(file); // It converts the image file to a base64 string.
    }
  }

  // Get Controls
  vehiclesDamages(): AbstractControl[] {
    return this.danniVeicolo.controls;
  }

  get controlliAlRientroControls(): FormGroup[] {
    return (this.reportDataForm.get('controlliAlRientro') as FormArray).controls as FormGroup[];
  }

  onMainPicSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      // It contains the base64 string of the image, which can be used to display the image in the UI or send it to the backend.
      this.reportDataForm.patchValue({ fotoPrincipale: reader.result as string });
      this.isLoadingPicture.set(false);
    };

    this.isLoadingPicture.set(true);
    reader.readAsDataURL(file); // It converts the image file to a base64 string.
  }

  onFotoVetrinaPicSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (!file) return;

    const fotoVetrinaArray = this.reportDataForm.get('fotoVetrina') as FormArray;

    this.isLoadingVetrinaIndices.update((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    })

    const reader = new FileReader();
    reader.onload = () => {
      // It contains the base64 string of the image, which can be used to display the image in the UI or send it to the backend.
      fotoVetrinaArray.at(index).setValue(reader.result as string);

      this.isLoadingVetrinaIndices.update((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    };
    reader.readAsDataURL(file); // It converts the image file to a base64 string.
  }

  onAltriElementiPicSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (!file) return;

    const altriElementiArray = this.reportDataForm.get('altriElementi') as FormArray;

    this.isLoadingAltriElementiIndices.update((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });

    const reader = new FileReader();
    reader.onload = () => {
      // It contains the base64 string of the image, which can be used to display the image in the UI or send it to the backend.
      altriElementiArray.at(index).setValue(reader.result as string);

      this.isLoadingAltriElementiIndices.update((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    };
    console.log('Selected altri elementi file:', file);
    reader.readAsDataURL(file); // It converts the image file to a base64 string.
  }

  onDocumentiPicSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (!file) return;

    const documentiArray = this.reportDataForm.get('documenti') as FormArray;

    this.isLoadingDocumentiIndices.update((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });

    const reader = new FileReader();
    reader.onload = () => {
      // It contains the base64 string of the image, which can be used to display the image in the UI or send it to the backend.
      documentiArray.at(index).setValue(reader.result as string);

      this.isLoadingDocumentiIndices.update((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    };
    reader.readAsDataURL(file); // It converts the image file to a base64 string.
  }

  convertToNumber(value: string | number | null | undefined): number {
    if (!value) return 0;
    if (typeof value === 'number') return value;

    // Convert the value to a string and trim whitespace
    let stringaPulita = value.toString().trim();

    // Remove any non-numeric characters except for the decimal separator (comma or dot)
    stringaPulita = stringaPulita.replace(/\./g, '');

    // Replace comma with dot for decimal conversion
    stringaPulita = stringaPulita.replace(',', '.');

    const num = parseFloat(stringaPulita);
    return isNaN(num) ? 0 : num;
  }

  onReportDataFormJSONUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (!file) return;

    // Creating a FormData object to send the file to the backend
    const formData = new FormData();
    formData.append('jsonFile', file, file.name); // 'jsonFile' must match the backend!

    // Calling the service directly by passing the FormData!
    this.formService.generatePDF(formData as unknown as PeriziaReportData).subscribe({
      next: () => {
        this.reportDataForm.reset();
        input.value = '';
      },
      error: (err) => {
        console.error('Errore durante la sottomissione del form tramite JSON:', err);
      }
    });
  }

  onReportDataFormSubmit(e: Event) {
    e.preventDefault();

    if (this.reportDataForm.invalid) {
      this.reportDataForm.markAllAsTouched();
      return;
    }

    const reportData = this.reportDataForm.value;
    console.info('Report Data:', reportData);

    this.formService.generatePDF(this.reportDataForm.value).subscribe({
      next: () => {
        this.reportDataForm.reset();
      },
      error: (err) => {
        console.error('Errore durante la sottomissione del form:', err);
      }
    });
  };
}

