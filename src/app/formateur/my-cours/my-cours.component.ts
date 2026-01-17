import { Component, OnInit } from '@angular/core';
import { Cours } from '../../shared/models/models';
import { AuthService } from 'src/app/auth/auth.service';
import { FormateurService } from 'src/app/services/formateur.service';

@Component({
    selector: 'app-my-cours',
    templateUrl: './my-cours.component.html',
    styleUrls: ['./my-cours.component.css']
})
export class MyCoursComponent implements OnInit {

    coursList: Cours[] = []; // tableau vide par défaut

    constructor(
        private formateurService: FormateurService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        const user = this.authService.currentUserValue;
        if (user && user.id) {
            this.formateurService.getCoursByFormateur(user.id).subscribe({
                next: (data: Cours[]) => { this.coursList = data; console.log("list", this.coursList); },
                error: (err) => console.error('Erreur chargement des cours:', err)
            });
        }
    }
}
