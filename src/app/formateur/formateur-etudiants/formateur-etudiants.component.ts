import { Component, OnInit } from '@angular/core';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
  selector: 'app-formateur-etudiants',
  templateUrl: './formateur-etudiants.component.html',
  styleUrls: ['./formateur-etudiants.component.css']
})
export class FormateurEtudiantsComponent implements OnInit {

  etudiants: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.loading = true;
    this.error = null;
    this.etudiantService.getAllEtudiants().subscribe(
      (data) => {
        this.etudiants = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des étudiants:', error);
        this.error = 'Erreur lors du chargement des étudiants';
        this.loading = false;
      }
    );
  }

}
