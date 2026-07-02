import { Component } from '@angular/core';
import { Container } from "../../layout/container/container";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [Container, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header { }
