import { Component, OnInit } from '@angular/core';
import { EtudiantSpaceService } from '../services/etudiant-space.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Cours } from '../../shared/models/models';

@Component({
    selector: 'app-cours-catalog',
    templateUrl: './cours-catalog.component.html',
    styleUrls: ['./cours-catalog.component.css']
})
export class CoursCatalogComponent implements OnInit {
    cours_list: Cours[] = [];

    constructor(
        private etudiantService: EtudiantSpaceService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.etudiantService.getAvailableCours().subscribe(data => this.cours_list = data);
    }

    enroll(coursId: number | undefined): void {
        if (!coursId) return;

        const user = this.authService.currentUserValue;
        if (user && user.id) {
            if (confirm('Confirmer l\'inscription à ce cours ?')) {
                this.etudiantService.enroll(coursId, user.id).subscribe({
                    next: () => alert('Inscription réussie !'),
                    error: (e) => {
                        console.error(e);
                        alert('Erreur lors de l\'inscription. Peut-être êtes-vous déjà inscrit ?');
                    }
                });
            }
        } else {
            alert('Utilisateur non identifié.');
        }
    }
}
