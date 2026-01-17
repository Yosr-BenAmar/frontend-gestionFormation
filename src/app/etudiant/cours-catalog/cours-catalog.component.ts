import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Cours } from '../../shared/models/models';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { CoursService } from 'src/app/services/cours.service';

@Component({
    selector: 'app-cours-catalog',
    templateUrl: './cours-catalog.component.html',
    styleUrls: ['./cours-catalog.component.css']
})
export class CoursCatalogComponent implements OnInit {
    cours_list: Cours[] = [];

    constructor(private coursService: CoursService,
        private etudiantService: EtudiantService,
        private authService: AuthService
    ) { }
    // ngOnInit(): void {
    //     this.etudiantService.getAvailableCours().subscribe({
    //         next: data => {
    //             console.log('Cours récupérés depuis le back :', data);
    //             this.cours_list = data;
    //         },
    //         // error: e => console.error('Erreur GET cours', e)
    //     });
    // }

    ngOnInit(): void {
        this.coursService.getAll().subscribe({
            next: data => {
                console.log('Cours récupérés depuis le back :', data);
                this.cours_list = data;
            },
            error: err => {
                console.error('Erreur GET cours', err);
            }
        });
    }
    enroll(coursId: number | undefined): void {
        if (!coursId) return;
        const user = this.authService.currentUserValue; // ton utilisateur connecté
        if (user && user.id) {
            if (confirm('Confirmer l\'inscription à ce cours ?')) {
                this.etudiantService.enroll(coursId, user.id).subscribe({
                    next: () => alert('Inscription réussie !'),
                    error: e => {
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
