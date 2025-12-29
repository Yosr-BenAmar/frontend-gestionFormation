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
        // redirect to home if already logged in
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

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login(this.f['email'].value, this.f['password'].value)
            .pipe(first())
            .subscribe({
                next: (user) => {
                    // Redirect based on role
                    if (user.role === Role.ADMIN) {
                        this.router.navigate(['/admin']);
                    } else if (user.role === Role.FORMATEUR) {
                        this.router.navigate(['/formateur']);
                    } else if (user.role === Role.ETUDIANT) {
                        this.router.navigate(['/etudiant']);
                    } else {
                        this.router.navigate([this.returnUrl]);
                    }
                },
                error: error => {
                    this.error = error.error?.message || 'Login failed';
                    this.loading = false;
                }
            });
    }
}
