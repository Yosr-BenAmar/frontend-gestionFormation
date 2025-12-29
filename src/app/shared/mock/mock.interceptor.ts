import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { USERS, COURS, FORMATEURS, ETUDIANTS, INSCRIPTIONS } from './mock-data';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // Wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (url.endsWith('/auth/login') && method === 'POST') {
                const { email, password } = body;
                const user = USERS.find(x => x.email === email && x.password === password);
                if (!user) return throwError(() => ({ error: { message: 'Email ou mot de passe incorrect' } }));
                return of(new HttpResponse({ status: 200, body: user }));
            }

            // check token for other requests (very basic)
            // if (!headers.get('Authorization')) return throwError(() => ({ status: 401, error: { message: 'Unauthorised' } }));

            // --- COURS ---
            if (url.endsWith('/cours') && method === 'GET') {
                return of(new HttpResponse({ status: 200, body: COURS }));
            }
            if (url.endsWith('/cours') && method === 'POST') {
                return of(new HttpResponse({ status: 200, body: body })); // echo back
            }
            if (url.match(/\/cours\/\d+$/) && method === 'GET') {
                const id = parseInt(url.split('/').pop()!);
                const cv = COURS.find(x => x.id === id);
                return of(new HttpResponse({ status: 200, body: cv }));
            }
            if (url.match(/\/cours\/\d+$/) && method === 'PUT') {
                return of(new HttpResponse({ status: 200, body: body }));
            }
            if (url.match(/\/cours\/\d+\/formateur$/) && method === 'PUT') {
                return of(new HttpResponse({ status: 200, body: {} }));
            }

            // --- FORMATEURS ---
            if (url.endsWith('/formateurs') && method === 'GET') {
                return of(new HttpResponse({ status: 200, body: FORMATEURS }));
            }

            // --- ETUDIANTS ---
            if (url.endsWith('/etudiants') && method === 'GET') {
                return of(new HttpResponse({ status: 200, body: ETUDIANTS }));
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}

export const mockInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: MockInterceptor,
    multi: true
};
