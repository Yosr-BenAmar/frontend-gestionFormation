import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class InscriptionService {
  apiUrl = `${environment.apiUrl}/inscriptions/`;

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<any[]>(this.apiUrl); }
  getById(id: number) { return this.http.get<any>(`${this.apiUrl}/${id}`); }
  create(inscription: any) { return this.http.post<any>(this.apiUrl, inscription); }
  update(id: number, inscription: any) { return this.http.put<any>(`${this.apiUrl}${id}`, inscription); }
  delete(id: number) { return this.http.delete(`${this.apiUrl}/${id}`); }
}
