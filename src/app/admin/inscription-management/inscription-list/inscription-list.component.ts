import { Component, OnInit } from '@angular/core';
import { InscriptionService } from 'src/app/services/inscription.service';
import { Inscription } from '../../../shared/models/models';

@Component({
    selector: 'app-inscription-list',
    templateUrl: './inscription-list.component.html',
    styleUrls: ['./inscription-list.component.css']
})
export class InscriptionListComponent implements OnInit {
    inscriptions: Inscription[] = [];

    constructor(private inscriptionService: InscriptionService) { }

    ngOnInit(): void {
        this.loadInscriptions();
    }

    loadInscriptions(): void {
        this.inscriptionService.getAll().subscribe({
            next: (data: Inscription[]) => this.inscriptions = data,
            error: (e: any) => console.error(e)
        });
    }

    deleteInscription(id: number | undefined): void {
        if (id && confirm('Voulez-vous vraiment annuler cette inscription ?')) {
            this.inscriptionService.delete(id).subscribe({
                next: () => {
                    this.inscriptions = this.inscriptions.filter(i => i.id !== id);
                },
                error: (e: any) => console.error(e)
            });
        }
    }
}
