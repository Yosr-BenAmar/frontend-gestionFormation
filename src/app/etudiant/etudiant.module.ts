import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { EtudiantDashboardComponent } from './etudiant-dashboard/etudiant-dashboard.component';
import { CoursCatalogComponent } from './cours-catalog/cours-catalog.component';
import { MyInscriptionsComponent } from './my-inscriptions/my-inscriptions.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: EtudiantDashboardComponent,
        children: [
            { path: 'catalog', component: CoursCatalogComponent },
            { path: 'inscriptions', component: MyInscriptionsComponent }
        ]
    }
];

@NgModule({
    declarations: [
        EtudiantDashboardComponent,
        CoursCatalogComponent,
        MyInscriptionsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class EtudiantModule { }
