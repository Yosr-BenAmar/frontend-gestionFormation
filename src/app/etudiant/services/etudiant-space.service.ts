import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours, Inscription, Note } from '../../shared/models/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EtudiantSpaceService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAvailableCours(): Observable<Cours[]> {
        return this.http.get<Cours[]>(`${this.apiUrl}/cours`); // General list
    }

    enroll(coursId: number, etudiantId: number): Observable<Inscription> {
        // API: POST /api/inscriptions
        // Body likely { etudiantId, coursId }
        return this.http.post<Inscription>(`${this.apiUrl}/inscriptions`, { etudiantId, coursId });
    }

    getMyInscriptions(): Observable<Inscription[]> {
        return this.http.get<Inscription[]>(`${this.apiUrl}/etudiant/inscriptions`);
    }

    getMyNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(`${this.apiUrl}/etudiant/notes`);
    }
}
