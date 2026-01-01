import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cours, Etudiant } from 'src/app/shared/models/models';
import { InscriptionService } from 'src/app/services/inscription.service';
import { CoursService } from 'src/app/services/cours.service';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
    selector: 'app-inscription-form',
    templateUrl: './inscription-form.component.html',
    styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {
    inscriptionForm!: FormGroup;
    etudiants: Etudiant[] = [];
    coursList: Cours[] = [];
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private inscriptionService: InscriptionService,
        private etudiantService: EtudiantService,
        private coursService: CoursService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.inscriptionForm = this.formBuilder.group({
            etudiantId: ['', Validators.required],
            coursId: ['', Validators.required]
        });

        this.etudiantService.getAll().subscribe(data => this.etudiants = data);
        this.coursService.getAll().subscribe(data => this.coursList = data);
    }

    get f() { return this.inscriptionForm.controls; }

    onSubmit(): void {
        this.submitted = true;
        if (this.inscriptionForm.invalid) return;

        this.inscriptionService.create(this.inscriptionForm.value).subscribe({
            next: () => this.router.navigate(['/admin/inscriptions']),
            error: (e) => console.error(e)
        });
    }
}
