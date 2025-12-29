import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { Role } from './shared/models/models';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: 'formateur',
    loadChildren: () => import('./formateur/formateur.module').then(m => m.FormateurModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.FORMATEUR] }
  },
  {
    path: 'etudiant',
    loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ETUDIANT] }
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
