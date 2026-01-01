import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class GroupeService {
  apiUrl = `${environment.apiUrl}/groupes`;

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<any[]>(this.apiUrl); }
  getById(id: number) { return this.http.get<any>(`${this.apiUrl}/${id}`); }
  add(groupe: any) { return this.http.post<any>(this.apiUrl, groupe); }
  update(groupe: any) { return this.http.put<any>(this.apiUrl, groupe); }
  delete(id: number) { return this.http.delete(`${this.apiUrl}/${id}`); }
}
