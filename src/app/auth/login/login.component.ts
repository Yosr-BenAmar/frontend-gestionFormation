import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Role } from 'src/app/shared/models/models';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string = '/';
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) return;

        this.loading = true;

        this.authService.login(
            this.f['email'].value,
            this.f['password'].value
        ).pipe(first())
            .subscribe({
                next: user => {
                    switch (user.role) {

                        case Role.ADMIN:
                            window.location.href = 'http://localhost:8080/dashboard/index';
                            break;

                        case Role.ETUDIANT:
                            this.router.navigate(['/etudiant']);
                            break;

                        case Role.FORMATEUR:
                            this.router.navigate(['/formateur']);
                            break;
                    }
                },
                error: err => {
                    this.error = err.error?.message || 'Login échoué';
                    this.loading = false;
                }
            });
    }

    // onSubmit() {
    //     this.submitted = true;

    //     if (this.loginForm.invalid) return;

    //     this.loading = true;

    //     this.authService.login(this.f['email'].value, this.f['password'].value)
    //         .pipe(first())
    //         .subscribe({
    //             next: user => {
    //                 // redirection selon rôle
    //                 switch (user.role) {
    //                     case Role.ADMIN:
    //                         this.router.navigate(['/admin']); // tu traiteras plus tard
    //                         break;
    //                     case Role.ETUDIANT:
    //                         this.router.navigate(['/etudiant']);
    //                         break;
    //                     case Role.FORMATEUR:
    //                         this.router.navigate(['/formateur']);
    //                         break;
    //                 }
    //             },
    //             error: err => {
    //                 this.error = err.error?.message || 'Login échoué';
    //                 this.loading = false;
    //             }
    //         });
    // }

}
