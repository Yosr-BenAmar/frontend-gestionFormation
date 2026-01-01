import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CoursService {
  apiUrl = `${environment.apiUrl}/cours/`;
  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<any[]>(this.apiUrl); }
  getById(id: number) { return this.http.get<any>(`${this.apiUrl}/${id}`); }
  create(cours: any) { return this.http.post<any>(this.apiUrl, cours); }

  update(id: number, cours: any) { return this.http.put<any>(`${this.apiUrl}${id}`, cours); }

  delete(id: number) { return this.http.delete(`${this.apiUrl}${id}`); }

  assignFormateur(coursId: number, formateurId: number) {
    return this.http.put<any>(`${this.apiUrl}${coursId}/formateur`, { formateurId });
  }
}
