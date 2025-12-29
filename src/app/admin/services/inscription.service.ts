import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscription } from '../../shared/models/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InscriptionService {
    private apiUrl = `${environment.apiUrl}/inscriptions`;

    constructor(private http: HttpClient) { }

    // Admin might want to list all, or by student/course. Requirements say "Inscrire un étudiant", "Annuler".
    // Assuming a GET /api/inscriptions exists for admin list, or maybe we just assume we can list them.
    getAll(): Observable<Inscription[]> {
        // If backend doesn't support listings all, this might fail or need modification.
        // But standard CRUD usually implies list.
        return this.http.get<Inscription[]>(this.apiUrl);
    }

    create(inscription: { etudiantId: number, coursId: number }): Observable<Inscription> {
        return this.http.post<Inscription>(this.apiUrl, inscription);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
