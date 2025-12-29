import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formateur } from '../../shared/models/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FormateurService {
    private apiUrl = `${environment.apiUrl}/formateurs`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Formateur[]> {
        return this.http.get<Formateur[]>(this.apiUrl);
    }

    getById(id: number): Observable<Formateur> {
        return this.http.get<Formateur>(`${this.apiUrl}/${id}`);
    }

    create(formateur: Formateur): Observable<Formateur> {
        return this.http.post<Formateur>(this.apiUrl, formateur);
    }

    update(id: number, formateur: Formateur): Observable<Formateur> {
        return this.http.put<Formateur>(`${this.apiUrl}/${id}`, formateur);
    }

    delete(id: number): Observable<void> {
        // Note: Delete wasn't explicitly in requirements for Formateur but logical to have.
        // If backend doesn't support it, this will 404/405.
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
