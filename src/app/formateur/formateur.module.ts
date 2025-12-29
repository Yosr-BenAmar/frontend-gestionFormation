import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { FormateurDashboardComponent } from './formateur-dashboard/formateur-dashboard.component';
import { MyCoursComponent } from './my-cours/my-cours.component';
import { NoteManagementComponent } from './note-management/note-management.component';

const routes: Routes = [
    {
        path: '',
        component: FormateurDashboardComponent,
        children: [
            { path: 'cours', component: MyCoursComponent },
            { path: 'cours/notes/:coursId', component: NoteManagementComponent }
        ]
    }
];

@NgModule({
    declarations: [
        FormateurDashboardComponent,
        MyCoursComponent,
        NoteManagementComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class FormateurModule { }
