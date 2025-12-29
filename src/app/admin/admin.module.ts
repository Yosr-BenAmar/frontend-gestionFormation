import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EtudiantListComponent } from './etudiant-management/etudiant-list/etudiant-list.component';
import { EtudiantFormComponent } from './etudiant-management/etudiant-form/etudiant-form.component';
import { FormateurListComponent } from './formateur-management/formateur-list/formateur-list.component';
import { FormateurFormComponent } from './formateur-management/formateur-form/formateur-form.component';
import { CoursListComponent } from './cours-management/cours-list/cours-list.component';
import { CoursFormComponent } from './cours-management/cours-form/cours-form.component';
import { InscriptionListComponent } from './inscription-management/inscription-list/inscription-list.component';
import { InscriptionFormComponent } from './inscription-management/inscription-form/inscription-form.component';

const routes: Routes = [
    {
        path: '',
        component: AdminDashboardComponent,
        children: [
            { path: 'etudiants', component: EtudiantListComponent },
            { path: 'etudiants/new', component: EtudiantFormComponent },
            { path: 'etudiants/edit/:id', component: EtudiantFormComponent },
            { path: 'formateurs', component: FormateurListComponent },
            { path: 'formateurs/new', component: FormateurFormComponent },
            { path: 'formateurs/edit/:id', component: FormateurFormComponent },
            { path: 'cours', component: CoursListComponent },
            { path: 'cours/new', component: CoursFormComponent },
            { path: 'cours/edit/:id', component: CoursFormComponent },
            { path: 'inscriptions', component: InscriptionListComponent },
            { path: 'inscriptions/new', component: InscriptionFormComponent },
        ]
    }
];

@NgModule({
    declarations: [
        AdminDashboardComponent,
        EtudiantListComponent,
        EtudiantFormComponent,
        FormateurListComponent,
        FormateurFormComponent,
        CoursListComponent,
        CoursFormComponent,
        InscriptionListComponent,
        InscriptionFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AdminModule { }
