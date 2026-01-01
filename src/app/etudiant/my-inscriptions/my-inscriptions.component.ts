import { Component, OnInit } from '@angular/core';
import { Inscription, Note } from '../../shared/models/models';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
    selector: 'app-my-inscriptions',
    templateUrl: './my-inscriptions.component.html',
    styleUrls: ['./my-inscriptions.component.css']
})
export class MyInscriptionsComponent implements OnInit {
    inscriptions: Inscription[] = [];
    notes: Note[] = [];
    // Map coursId or Inscription -> Note
    noteMap: { [coursId: number]: Note } = {};

    constructor(private etudiantService: EtudiantService) { }

    ngOnInit(): void {
        this.etudiantService.getMyInscriptions().subscribe({
            next: data => this.inscriptions = data,
            error: e => console.error('Erreur GET inscriptions', e)
        });

        this.etudiantService.getMyNotes().subscribe({
            next: data => {
                this.notes = data;
                data.forEach(n => {
                    if (n.cours && n.cours.id) {
                        this.noteMap[n.cours.id] = n;
                    }
                });
            },
            error: e => console.error('Erreur GET notes', e)
        });
    }

    getNote(coursId: number | undefined): Note | undefined {
        if (!coursId) return undefined;
        return this.noteMap[coursId];
    }

}
