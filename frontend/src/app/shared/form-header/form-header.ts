import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-header',
  imports: [],
  templateUrl: './form-header.html',
  styleUrl: './form-header.css',
})
export class FormHeader {
  sectionTitle = input<string>("Nessuna intestazione");
}
