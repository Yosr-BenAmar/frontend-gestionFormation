import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AffectationCours, Cours, Etudiant, Formateur, Note } from '../shared/models/models';
import { catchError, Observable } from 'rxjs';
import { AffectationCoursService } from './affectation-cours.service';

@Injectable({ providedIn: 'root' })
export class FormateurService {
  apiUrl = `${environment.apiUrl}/formateurs`;

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<any[]>(this.apiUrl); }
  getById(id: number) { return this.http.get<any>(`${this.apiUrl}/${id}`); }
  create(formateur: any) { return this.http.post<any>(this.apiUrl, formateur); }
  update(id: number, formateur: any) { return this.http.put<any>(`${this.apiUrl}${id}`, formateur); }
  delete(id: number) { return this.http.delete(`${this.apiUrl}/${id}`); }

  getMesCours(formateurId: number) {
    return this.http.get<Cours[]>(`${this.apiUrl}${formateurId}/cours`);
  }

  getInscriptionsDuCours(coursId: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/cours/${coursId}/inscriptions`);
  }

  updateNote(inscriptionId: number, note: number) {
    return this.http.put<any>(`${environment.apiUrl}/inscriptions/${inscriptionId}/note`, { note });
  }
  // getMyAffectations(formateurId: number): Observable<AffectationCours[]> {
  //   return this.http.get<AffectationCours[]>(`${this.apiUrl}formateur/${formateurId}`);
  // }
  getMyCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl}/formateur/cours`);
  }

  getEtudiantsByCours(coursId: number): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/cours/${coursId}/etudiants`);
  }


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
  getCoursByFormateur(formateurId: number): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl}/${formateurId}/cours`);
  }
}
