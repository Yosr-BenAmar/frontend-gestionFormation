import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User, Role } from 'src/app/shared/models/models';
import { delay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    // Liste simulée d'utilisateurs
    private users: User[] = [
        { id: 1, email: 'admin@test.com', password: 'admin', role: Role.ADMIN, nom: 'Admin', prenom: 'User' },
        { id: 2, email: 'etudiant@test.com', password: 'etudiant', role: Role.ETUDIANT, nom: 'Jean', prenom: 'Dupont' },
        { id: 3, email: 'formateur@test.com', password: 'formateur', role: Role.FORMATEUR, nom: 'Paul', prenom: 'Durand' },
    ];

    constructor() {
        this.currentUserSubject = new BehaviorSubject<User | null>(
            JSON.parse(localStorage.getItem('currentUser') || 'null')
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    // Login simulé
    login(email: string, password: string): Observable<User> {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return of(user).pipe(delay(500)); // simuler un petit délai
        } else {
            return throwError(() => ({ error: { message: 'Email ou mot de passe incorrect' } }));
        }
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
