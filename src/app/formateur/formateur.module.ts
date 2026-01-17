import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { FormateurDashboardComponent } from './formateur-dashboard/formateur-dashboard.component';
import { MyCoursComponent } from './my-cours/my-cours.component';
import { NoteManagementComponent } from './note-management/note-management.component';
import { FormateurEtudiantsComponent } from './formateur-etudiants/formateur-etudiants.component';
import { FormateurEvaluationsComponent } from './formateur-evaluations/formateur-evaluations.component';

const routes: Routes = [
    {
        path: '',
        component: FormateurDashboardComponent,
        children: [
            { path: 'cours', component: MyCoursComponent },
            { path: 'cours/notes/:coursId', component: NoteManagementComponent },
            { path: 'etudiants', component: FormateurEtudiantsComponent },
            { path: 'evaluations', component: FormateurEvaluationsComponent }
        ]
    }
];

@NgModule({
    declarations: [
        FormateurDashboardComponent,
        MyCoursComponent,
        NoteManagementComponent,
        FormateurEtudiantsComponent,
        FormateurEvaluationsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class FormateurModule { }
