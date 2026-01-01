import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-formateur-dashboard',
  template: `
    <div class="dashboard container-fluid py-4">
      
      <!-- Header -->
      <div class="dashboard-header mb-4">
        <div>
          <h2 class="dashboard-title">
            Bonjour, <span>{{ user?.nom }}</span>
          </h2>
          <p class="dashboard-subtitle">
            Tableau de bord formateur – gestion pédagogique
          </p>
        </div>
      </div>

      <!-- Cards -->
      <div class="row g-4">
        <div
          class="col-xl-3 col-lg-4 col-md-6 col-sm-12"
          *ngFor="let card of cards"
        >
          <div class="dashboard-card" [ngClass]="card.color">
            
            <div class="card-top">
              <div class="card-icon">{{ card.icon }}</div>
            </div>

            <div class="card-content">
              <h5 class="card-title">{{ card.title }}</h5>
              <p class="card-text">{{ card.description }}</p>
            </div>

            <div class="card-footer">
              <a [routerLink]="card.link" class="card-action">
                Accéder
                <span class="arrow">→</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    /* ===== GLOBAL ===== */
    .dashboard {
      background: #f4f6f9;
      min-height: 100vh;
    }

    /* ===== HEADER ===== */
    .dashboard-header {
      display: flex;
      justify-content: center; /* Centré horizontalement */
      align-items: center;
      text-align: center;      /* Texte centré */
      flex-direction: column;
    }

    .dashboard-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.2rem;
    }

    .dashboard-title span {
      color: #2563eb;
    }

    .dashboard-subtitle {
      color: #6b7280;
      font-size: 0.95rem;
    }

    /* ===== GRID ===== */
    .row {
        justify-content: center; /* Centre les cartes au milieu de la page */
    }

    /* ===== CARD ===== */
    .dashboard-card {
      height: 100%;
      background: #ffffff;
      border-radius: 20px;
      padding: 1.6rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;    /* Contenu de la carte centré */
      text-align: center;     /* Texte de la carte centré */
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      transition: all 0.35s ease;
      position: relative;
      overflow: hidden;
    }

    .dashboard-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 4px;
      width: 100%;
      background: var(--accent);
    }

    .dashboard-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.15);
    }

    /* ===== CARD TOP ===== */
    .card-top {
      display: flex;
      justify-content: center; /* Icone centrée */
      width: 100%;
    }

    .card-icon {
      font-size: 2.2rem;
      opacity: 0.9;
    }

    /* ===== CARD CONTENT ===== */
    .card-content {
      margin-top: 1rem;
    }

    .card-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #111827;
      margin-bottom: 0.4rem;
    }

    .card-text {
      font-size: 0.9rem;
      color: #6b7280;
      line-height: 1.4;
    }

    /* ===== CARD FOOTER ===== */
    .card-footer {
      margin-top: 1.4rem;
      display: flex;            /* Flex pour centrer le lien */
      justify-content: center;
      width: 100%;
    }

    .card-action {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: none;
      color: var(--accent);
      transition: gap 0.3s ease;
    }

    .card-action:hover {
      gap: 0.7rem;
    }

    /* ===== COLOR THEMES ===== */
    .blue {
      --accent: #2563eb;
    }

    .green {
      --accent: #16a34a;
    }

    .orange {
      --accent: #ea580c;
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 768px) {
      .dashboard-title {
        font-size: 1.6rem;
      }

      .dashboard-card {
        padding: 1.3rem;
      }
    }
  `]
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
