import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { EtudiantListComponent } from './etudiant/etudiant-list/etudiant-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EtudiantListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // mockInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
