import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours } from '../../shared/models/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoursService {
    private apiUrl = `${environment.apiUrl}/cours`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Cours[]> {
        return this.http.get<Cours[]>(this.apiUrl);
    }

    getById(id: number): Observable<Cours> {
        return this.http.get<Cours>(`${this.apiUrl}/${id}`);
    }

    create(cours: Cours): Observable<Cours> {
        return this.http.post<Cours>(this.apiUrl, cours);
    }

    update(id: number, cours: Cours): Observable<Cours> {
        return this.http.put<Cours>(`${this.apiUrl}/${id}`, cours);
    }

    // Assign formateur is likely just an update or specific endpoint
    assignFormateur(coursId: number, formateurId: number): Observable<Cours> {
        return this.http.put<Cours>(`${this.apiUrl}/${coursId}/formateur`, { formateurId }); // Adjust payload based on backend expectation, assuming body or param
        // If backend expects just ID in body:
        // return this.http.put<Cours>(`${this.apiUrl}/${coursId}/formateur`, formateurId);
        // User request: PUT /api/cours/{id}/formateur
        // Usually expects the formateur object or ID in body. I'll assume ID for now or check if I can generic update.
    }
}
