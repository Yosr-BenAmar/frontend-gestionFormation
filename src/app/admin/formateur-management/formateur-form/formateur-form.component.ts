import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormateurService } from '../../services/formateur.service';
import { Role } from 'src/app/shared/models/models';

@Component({
    selector: 'app-formateur-form',
    templateUrl: './formateur-form.component.html',
    styleUrls: ['./formateur-form.component.css']
})
export class FormateurFormComponent implements OnInit {
    formateurForm!: FormGroup;
    isEditMode = false;
    id!: number;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private formateurService: FormateurService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isEditMode = !!this.id;

        this.formateurForm = this.formBuilder.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: [''],
            specialite: ['', Validators.required],
            role: [Role.FORMATEUR]
        });

        if (this.isEditMode) {
            this.formateurService.getById(this.id).subscribe(data => {
                this.formateurForm.patchValue(data);
            });
            this.formateurForm.get('password')?.clearValidators();
            this.formateurForm.get('password')?.updateValueAndValidity();
        } else {
            this.formateurForm.get('password')?.setValidators(Validators.required);
        }
    }

    get f() { return this.formateurForm.controls; }

    onSubmit(): void {
        this.submitted = true;
        if (this.formateurForm.invalid) return;

        const formateur = this.formateurForm.value;
        formateur.role = Role.FORMATEUR;

        if (this.isEditMode) {
            this.formateurService.update(this.id, formateur).subscribe({
                next: () => this.router.navigate(['/admin/formateurs']),
                error: (e) => console.error(e)
            });
        } else {
            this.formateurService.create(formateur).subscribe({
                next: () => this.router.navigate(['/admin/formateurs']),
                error: (e) => console.error(e)
            });
        }
    }
}
