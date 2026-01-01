import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etudiant, Note, Cours } from '../../shared/models/models';
import { FormateurService } from 'src/app/services/formateur.service';

@Component({
    selector: 'app-note-management',
    templateUrl: './note-management.component.html',
    styleUrls: ['./note-management.component.css']
})
export class NoteManagementComponent implements OnInit {
    coursId!: number;
    etudiants: Etudiant[] = [];
    existingNotes: Note[] = [];
    // Mapping etudiantId -> Note
    noteMap: { [key: number]: Note } = {};

    constructor(
        private route: ActivatedRoute,
        private formateurService: FormateurService
    ) { }

    ngOnInit(): void {
        this.coursId = this.route.snapshot.params['coursId'];
        this.loadData();
    }

    loadData(): void {
        this.formateurService.getEtudiantsByCours(this.coursId).subscribe(etudiants => {
            this.etudiants = etudiants;
        });

        // Strategy: Fetch existing notes if possible. If endpoint doesn't exist, we assume notes are 0 or empty.
        this.formateurService.getNotesByCours(this.coursId).subscribe({
            next: (notes) => {
                this.existingNotes = notes;
                notes.forEach(n => {
                    // Assuming Note has etudiant object or ID. My model has etudiant: Etudiant. 
                    // Ideally fetching notes returns full objects.
                    if (n.etudiant && n.etudiant.id) {
                        this.noteMap[n.etudiant.id] = n;
                    }
                });
            },
            error: () => {
                // Only if endpoint exists
                console.warn('Could not fetch existing notes');
            }
        });
    }

    getNoteValue(etudiantId: number | undefined): number | undefined {
        if (!etudiantId) return undefined;
        return this.noteMap[etudiantId]?.valeur;
    }

    getNoteRemark(etudiantId: number | undefined): string | undefined {
        if (!etudiantId) return undefined;
        return this.noteMap[etudiantId]?.remarque;
    }

    saveNote(etudiant: Etudiant, valeurStr: string, remarque: string): void {
        const valeur = parseFloat(valeurStr);
        if (isNaN(valeur)) return;

        if (!etudiant.id) return;

        const existingNote = this.noteMap[etudiant.id];

        const note: Note = {
            id: existingNote?.id,
            etudiant: etudiant,
            cours: { id: this.coursId } as Cours,
            valeur: valeur,
            remarque: remarque
        };

        this.formateurService.saveNote(note).subscribe(savedNote => {
            if (etudiant.id && savedNote) {
                this.noteMap[etudiant.id] = savedNote;
                alert('Note enregistrée !');
            }
        });
    }
}
