import { Component, OnInit } from '@angular/core';
import { Cours } from 'src/app/shared/models/models';
import { CoursService } from '../../services/cours.service';
@Component({
    selector: 'app-cours-list',
    templateUrl: './cours-list.component.html',
    styleUrls: ['./cours-list.component.css']
})
export class CoursListComponent implements OnInit {
    cours_list: Cours[] = [];

    constructor(private coursService: CoursService) { }

    ngOnInit(): void {
        this.loadCours();
    }

    loadCours(): void {
        this.coursService.getAll().subscribe({
            next: (data) => this.cours_list = data,
            error: (e) => console.error(e)
        });
    }
}
