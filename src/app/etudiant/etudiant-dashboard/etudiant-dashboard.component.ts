import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-etudiant-dashboard',
  template: `
    <div class="dashboard container-fluid py-4">

      <!-- Header -->
      <div class="dashboard-header mb-4">
        <div>
          <h2 class="dashboard-title">
            Bonjour, <span>{{ user?.nom }}</span>
          </h2>
          <p class="dashboard-subtitle">
            Accédez à vos cours et suivez votre progression
          </p>
        </div>
      </div>

      <!-- Cards -->
      <div class="row g-4 justify-content-center">
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex">
          <div class="dashboard-card blue">
            <div class="card-top">
              <div class="card-icon">📚</div>
            </div>

            <div class="card-content">
              <h5 class="card-title">Catalogue des cours</h5>
              <p class="card-text">
                Parcourir et s'inscrire aux cours disponibles.
              </p>
            </div>

            <div class="card-footer">
              <a routerLink="catalog" class="card-action">
                Voir le catalogue <span>→</span>
              </a>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex">
          <div class="dashboard-card green">
            <div class="card-top">
              <div class="card-icon">🎓</div>
            </div>

            <div class="card-content">
              <h5 class="card-title">Mes inscriptions & notes</h5>
              <p class="card-text">
                Consulter vos cours actuels et vos résultats.
              </p>
            </div>

            <div class="card-footer">
              <a routerLink="inscriptions" class="card-action">
                Consulter <span>→</span>
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
      justify-content: center;
      text-align: center;
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

    /* ===== CARD ===== */
    .dashboard-card {
      width: 100%;
      background: #ffffff;
      border-radius: 20px;
      padding: 1.6rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
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
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .card-icon {
      font-size: 2.4rem;
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
      display: flex;
      justify-content: center;
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
    .blue { --accent: #2563eb; }
    .green { --accent: #16a34a; }

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
export class EtudiantDashboardComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }
}
