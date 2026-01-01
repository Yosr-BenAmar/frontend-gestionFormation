import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AffectationCoursService {
  apiUrl = `${environment.apiUrl}/affectation-cours/`;

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<any[]>(this.apiUrl); }
  getById(id: number) { return this.http.get<any>(`${this.apiUrl}/${id}`); }
  add(affectation: any) { return this.http.post<any>(this.apiUrl, affectation); }
  update(affectation: any) { return this.http.put<any>(this.apiUrl, affectation); }
  delete(id: number) { return this.http.delete(`${this.apiUrl}/${id}`); }
}
