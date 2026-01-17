import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class NoteService {
  apiUrl = `${environment.apiUrl}/notes/`;

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<any[]>(this.apiUrl); }
  
  getNotes() { 
    return this.http.get<any[]>(this.apiUrl); 
  }
  
  getById(id: number) { return this.http.get<any>(`${this.apiUrl}/${id}`); }
  create(note: any) { return this.http.post<any>(this.apiUrl, note); }
  update(id: number, note: any) { return this.http.put<any>(`${this.apiUrl}${id}`, note); }
  delete(id: number) { return this.http.delete(`${this.apiUrl}/${id}`); }
}
