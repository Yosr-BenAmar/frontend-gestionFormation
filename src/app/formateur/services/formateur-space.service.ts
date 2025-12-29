import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours, Etudiant, Note } from '../../shared/models/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FormateurSpaceService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getMyCours(): Observable<Cours[]> {
        return this.http.get<Cours[]>(`${this.apiUrl}/formateur/cours`);
    }

    getEtudiantsByCours(coursId: number): Observable<Etudiant[]> {
        return this.http.get<Etudiant[]>(`${this.apiUrl}/cours/${coursId}/etudiants`);
    }

    // Assuming this gets notes for a cours/etudiant combo or list?
    // User Prompt: POST /api/notes, PUT /api/notes/{id}
    // Ideally we need to fetch existing notes too. Assuming getEtudiantsByCours might return EtudiantDTO with notes or we fetch notes separately.
    // Prompt says "Saisir et modifier les notes".
    // I'll assume we can fetch notes. Maybe `GET /api/notes` or it's embedded.
    // I will add a method to save note.
    saveNote(note: Note): Observable<Note> {
        if (note.id) {
            return this.http.put<Note>(`${this.apiUrl}/notes/${note.id}`, note);
        } else {
            return this.http.post<Note>(`${this.apiUrl}/notes`, note);
        }
    }

    // Optional: fetch notes for a course?
    getNotesByCours(coursId: number): Observable<Note[]> {
        // Assuming endpoint exists or we filter client side from a general list if backend allows.
        // For now, I'll assume `getEtudiantsByCours` might be enough? No, that returns Etudiant[].
        // Maybe `GET /api/notes?coursId=...`?
        // I'll stick to what I can do: Create/Update. Fetching might need valid endpoint.
        return this.http.get<Note[]>(`${this.apiUrl}/notes/cours/${coursId}`); // Guessing endpoint
    }
}
