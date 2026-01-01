import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  apiUrl = `${environment.apiUrl}/notifications/`;

  constructor(private http: HttpClient) { }

  getAll() { return this.http.get<any[]>(this.apiUrl); }
  getById(id: number) { return this.http.get<any>(`${this.apiUrl}/${id}`); }
  add(notification: any) { return this.http.post<any>(this.apiUrl, notification); }
  update(notification: any) { return this.http.put<any>(this.apiUrl, notification); }
  delete(id: number) { return this.http.delete(`${this.apiUrl}/${id}`); }
}
