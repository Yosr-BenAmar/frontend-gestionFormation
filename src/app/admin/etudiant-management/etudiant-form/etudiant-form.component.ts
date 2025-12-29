import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../../services/etudiant.service';
import { Role } from 'src/app/shared/models/models';

@Component({
    selector: 'app-etudiant-form',
    templateUrl: './etudiant-form.component.html',
    styleUrls: ['./etudiant-form.component.css']
})
export class EtudiantFormComponent implements OnInit {
    etudiantForm!: FormGroup;
    isEditMode = false;
    id!: number;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private etudiantService: EtudiantService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isEditMode = !!this.id;

        this.etudiantForm = this.formBuilder.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: [''], // Only required for new user, or optional update
            role: [Role.ETUDIANT]
        });

        if (this.isEditMode) {
            this.etudiantService.getById(this.id).subscribe(data => {
                this.etudiantForm.patchValue(data);
            });
            // Remove password validation in edit mode if not changing
            this.etudiantForm.get('password')?.clearValidators();
            this.etudiantForm.get('password')?.updateValueAndValidity();
        } else {
            this.etudiantForm.get('password')?.setValidators(Validators.required);
        }
    }

    get f() { return this.etudiantForm.controls; }

    onSubmit(): void {
        this.submitted = true;
        if (this.etudiantForm.invalid) return;

        const etudiant = this.etudiantForm.value;
        etudiant.role = Role.ETUDIANT; // Ensure role is set

        if (this.isEditMode) {
            this.etudiantService.update(this.id, etudiant).subscribe({
                next: () => this.router.navigate(['/admin/etudiants']),
                error: (e) => console.error(e)
            });
        } else {
            this.etudiantService.create(etudiant).subscribe({
                next: () => this.router.navigate(['/admin/etudiants']),
                error: (e) => console.error(e)
            });
        }
    }
}
