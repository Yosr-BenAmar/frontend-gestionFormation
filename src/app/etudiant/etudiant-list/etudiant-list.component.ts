import { Component, OnInit } from '@angular/core';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
  selector: 'app-etudiant-list',
  template: `
    <h3>Test API Étudiants</h3>
    <ul>
      <li *ngFor="let e of etudiants">
        {{ e.id }} - {{ e.nom }} {{ e.prenom }}
      </li>
    </ul>
  `
})
export class EtudiantListComponent implements OnInit {

  etudiants: any[] = [];

  constructor(private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.etudiantService.getAll().subscribe({
      next: data => {
        console.log('DATA:', data);
        this.etudiants = data;
      },
      error: err => {
        console.error('ERREUR API:', err);
      }
    });
  }
}
