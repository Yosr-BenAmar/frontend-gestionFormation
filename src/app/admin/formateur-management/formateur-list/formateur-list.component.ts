import { Component, OnInit } from '@angular/core';
import { FormateurService } from '../../services/formateur.service';
import { Formateur } from 'src/app/shared/models/models';

@Component({
    selector: 'app-formateur-list',
    templateUrl: './formateur-list.component.html',
    styleUrls: ['./formateur-list.component.css']
})
export class FormateurListComponent implements OnInit {
    formateurs: Formateur[] = [];

    constructor(private formateurService: FormateurService) { }

    ngOnInit(): void {
        this.loadFormateurs();
    }

    loadFormateurs(): void {
        this.formateurService.getAll().subscribe({
            next: (data) => this.formateurs = data,
            error: (e) => console.error(e)
        });
    }
}
