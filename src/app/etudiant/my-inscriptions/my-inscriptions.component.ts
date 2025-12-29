import { Component, OnInit } from '@angular/core';
import { EtudiantSpaceService } from '../services/etudiant-space.service';
import { Inscription, Note } from '../../shared/models/models';

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

    constructor(private etudiantService: EtudiantSpaceService) { }

    ngOnInit(): void {
        this.etudiantService.getMyInscriptions().subscribe(data => this.inscriptions = data);
        this.etudiantService.getMyNotes().subscribe(data => {
            this.notes = data;
            data.forEach(n => {
                if (n.cours && n.cours.id) {
                    this.noteMap[n.cours.id] = n;
                }
            });
        });
    }

    getNote(coursId: number | undefined): Note | undefined {
        if (!coursId) return undefined;
        return this.noteMap[coursId];
    }
}
