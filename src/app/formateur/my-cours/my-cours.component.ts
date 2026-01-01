import { Component, OnInit } from '@angular/core';

import { AffectationCours, Cours } from '../../shared/models/models';
import { AuthService } from 'src/app/auth/auth.service';
import { FormateurService } from 'src/app/services/formateur.service';

@Component({
    selector: 'app-my-cours',
    templateUrl: './my-cours.component.html',
    styleUrls: ['./my-cours.component.css']
})
export class MyCoursComponent implements OnInit {

    coursList: Cours[] = [];
    affectations: AffectationCours[] = [];

    constructor(
        private formateurService: FormateurService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        const user = this.authService.currentUserValue;
        if (user && user.id) {
            this.formateurService.getMesCours(user.id).subscribe({
                next: (data) => {
                    console.log('Cours du formateur:', data);
                    this.coursList = data;
                },
                error: (e) => console.error('Erreur chargement des cours:', e)
            });
        }
    }
    // ngOnInit(): void {
    //     const user = this.authService.currentUserValue;
    //     if (user && user.id) {
    //         this.formateurService.getMyAffectations(user.id).subscribe({
    //             next: data => {
    //                 console.log('Affectations récupérées:', data);
    //                 this.affectations = data;
    //             },
    //             error: e => console.error('Erreur chargement affectations', e)
    //         });
    //     }
    // }
}
