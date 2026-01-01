import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cours, Inscription, Note } from '../shared/models/models';

@Injectable({ providedIn: 'root' })
export class EtudiantService {
  apiUrl = `${environment.apiUrl}/etudiants/`;

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<any[]>(this.apiUrl); }
  getById(id: number) { return this.http.get<any>(`${this.apiUrl}/${id}`); }
  create(etudiant: any) { return this.http.post<any>(this.apiUrl, etudiant); }
  update(id: number, etudiant: any) { return this.http.put<any>(`${this.apiUrl}${id}`, etudiant); }
  delete(id: number) { return this.http.delete(`${this.apiUrl}${id}`); }


  // GET /api/cours -> lister tous les cours disponibles
  getAvailableCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${environment.apiUrl}/cours/`);
  }

  // POST /api/inscriptions -> inscrire un étudiant à un cours
  enroll(coursId: number, etudiantId: number): Observable<any> {
    const inscription = { coursId, etudiantId }; // adapter selon ton DTO côté back
    return this.http.post(`${this.apiUrl}inscriptions/`, inscription);
  }

  // GET /api/inscriptions -> toutes les inscriptions d’un étudiant
  getMyInscriptions(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}inscriptions/`);
  }

  // GET /api/notes -> toutes les notes de l’étudiant
  getMyNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}notes/`);
  }
}
