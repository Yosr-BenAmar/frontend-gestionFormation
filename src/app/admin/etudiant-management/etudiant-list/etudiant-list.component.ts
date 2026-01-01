import { Component, OnInit } from '@angular/core';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { Etudiant } from 'src/app/shared/models/models';
@Component({
    selector: 'app-etudiant-list',
    templateUrl: './etudiant-list.component.html',
    styleUrls: ['./etudiant-list.component.css']
})
export class EtudiantListComponent implements OnInit {
    etudiants: Etudiant[] = [];

    constructor(private etudiantService: EtudiantService) { }

    ngOnInit(): void {
        this.loadEtudiants();
    }

    loadEtudiants(): void {
        this.etudiantService.getAll().subscribe({
            next: (data) => this.etudiants = data,
            error: (e) => console.error(e)
        });
    }

    deleteEtudiant(id: number | undefined): void {
        if (id && confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
            this.etudiantService.delete(id).subscribe({
                next: () => {
                    this.etudiants = this.etudiants.filter(e => e.id !== id);
                },
                error: (e) => console.error(e)
            });
        }
    }
}
