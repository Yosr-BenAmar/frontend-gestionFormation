import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-formateur-evaluations',
  templateUrl: './formateur-evaluations.component.html',
  styleUrls: ['./formateur-evaluations.component.css']
})
export class FormateurEvaluationsComponent implements OnInit {

  evaluations: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadEvaluations();
  }

  loadEvaluations(): void {
    this.loading = true;
    this.error = null;
    // Charger les notes/évaluations
    this.noteService.getNotes().subscribe(
      (data) => {
        this.evaluations = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des évaluations:', error);
        this.error = 'Erreur lors du chargement des évaluations';
        this.loading = false;
      }
    );
  }

}
