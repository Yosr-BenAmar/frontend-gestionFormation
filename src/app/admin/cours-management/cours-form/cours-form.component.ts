import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Formateur } from 'src/app/shared/models/models';
import { FormateurService } from 'src/app/services/formateur.service';
import { CoursService } from 'src/app/services/cours.service';


@Component({
    selector: 'app-cours-form',
    templateUrl: './cours-form.component.html',
    styleUrls: ['./cours-form.component.css']
})
export class CoursFormComponent implements OnInit {
    coursForm!: FormGroup;
    isEditMode = false;
    id!: number;
    submitted = false;
    formateurs: Formateur[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private coursService: CoursService,
        private formateurService: FormateurService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isEditMode = !!this.id;

        this.coursForm = this.formBuilder.group({
            titre: ['', Validators.required],
            description: [''],
            dateDebut: ['', Validators.required],
            dateFin: ['', Validators.required],
            formateurId: [''] // Optional at creation?
        });

        // Load formateurs for dropdown
        this.formateurService.getAll().subscribe(data => this.formateurs = data);

        if (this.isEditMode) {
            this.coursService.getById(this.id).subscribe(data => {
                // Handle dates for input type="date"
                let formattedData: any = { ...data };
                // if (data.dateDebut) formattedData.dateDebut = this.formatDate(data.dateDebut);
                // if (data.dateFin) formattedData.dateFin = this.formatDate(data.dateFin);
                // Pre-select formateur
                if (data.formateur) formattedData.formateurId = data.formateur.id;

                this.coursForm.patchValue(formattedData);
            });
        }
    }

    formatDate(date: any): string {
        if (!date) return '';
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    get f() { return this.coursForm.controls; }

    onSubmit(): void {
        this.submitted = true;
        if (this.coursForm.invalid) return;

        const cours = this.coursForm.value;
        // Map formateurId to formateur object if backend requires, or send ID separately.
        // Based on user request: PUT /api/cours/{id}/formateur exists.
        // But creation might accept it. I'll send basic fields.

        // Convert formateurId to formateur object stub if needed, or backend handles it.
        // Assuming backend takes the object or the ID. Since fields are standard, I'll send payload as is.
        // However, interface Cours has `formateur?: Formateur`. It might not have `formateurId`.
        // My model has `formateurId`.

        // Let's refine the payload
        if (cours.formateurId) {
            cours.formateur = { id: cours.formateurId } as Formateur;
        }

        if (this.isEditMode) {
            this.coursService.update(this.id, cours).subscribe({
                next: () => {
                    // If formateur changed, maybe call assign?
                    if (cours.formateurId) {
                        this.coursService.assignFormateur(this.id, cours.formateurId).subscribe(() => {
                            this.router.navigate(['/admin/cours']);
                        });
                    } else {
                        this.router.navigate(['/admin/cours']);
                    }
                },
                error: (e: any) => console.error(e)
            });
        }
        else {
            this.coursService.create(cours).subscribe({
                next: (newCours) => {
                    if (cours.formateurId && newCours.id) {
                        this.coursService.assignFormateur(newCours.id, cours.formateurId).subscribe(() => {
                            this.router.navigate(['/admin/cours']);
                        });
                    } else {
                        this.router.navigate(['/admin/cours']);
                    }
                },
                error: (e) => console.error(e)
            });
        }
    }
}
