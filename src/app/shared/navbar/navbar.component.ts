import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User, Role } from '../models/models';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    currentUser: User | null = null;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.authService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.ADMIN;
    }

    get isFormateur() {
        return this.currentUser && this.currentUser.role === Role.FORMATEUR;
    }

    get isEtudiant() {
        return this.currentUser && this.currentUser.role === Role.ETUDIANT;
    }
}
