import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-formateur-dashboard',
  templateUrl: './formateur-dashboard.component.html',
  styleUrls: ['./formateur-dashboard.component.css']
})
export class FormateurDashboardComponent implements OnInit {

  user: any;

  cards = [
    {
      title: 'Mes Cours',
      description: 'Création, organisation et suivi des cours et contenus pédagogiques.',
      icon: '📚',
      link: 'cours',
      color: 'blue'
    },
    {
      title: 'Étudiants',
      description: 'Gestion des étudiants, suivi des progrès et participation.',
      icon: '🎓',
      link: 'etudiants',
      color: 'green'
    },
    {
      title: 'Évaluations',
      description: 'Création, correction et analyse des évaluations.',
      icon: '📝',
      link: 'evaluations',
      color: 'orange'
    }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
  }
}
