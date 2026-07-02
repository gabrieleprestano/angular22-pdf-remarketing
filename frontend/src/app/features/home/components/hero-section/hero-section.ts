import { Component } from '@angular/core';
import { Container } from "../../../../layout/container/container";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [Container, CommonModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  readonly points = [
    "Intestazione con targa e numero perizia",
    "Scheda tecnica veicolo completa",
    "Treno pneumatici e controlli al rientro",
    "Valutazione danni con calcolo automatico",
    "Galleria fotografie fino a 22 immagini",
  ]
}
