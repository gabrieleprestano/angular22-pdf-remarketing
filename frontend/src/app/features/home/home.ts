import { Component } from '@angular/core';
import { HeroSection } from "./components/hero-section/hero-section";
import { FormSection } from "./components/form-section/form-section";

@Component({
  selector: 'app-home',
  imports: [HeroSection, FormSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home { }
