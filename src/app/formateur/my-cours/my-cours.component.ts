import { Component, OnInit } from '@angular/core';
import { FormateurSpaceService } from '../services/formateur-space.service';
import { Cours } from '../../shared/models/models';

@Component({
    selector: 'app-my-cours',
    templateUrl: './my-cours.component.html',
    styleUrls: ['./my-cours.component.css']
})
export class MyCoursComponent implements OnInit {
    cours_list: Cours[] = [];

    constructor(private formateurService: FormateurSpaceService) { }

    ngOnInit(): void {
        this.formateurService.getMyCours().subscribe({
            next: (data) => this.cours_list = data,
            error: (e) => console.error(e)
        });
    }
}
