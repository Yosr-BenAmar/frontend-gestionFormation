import { Component } from '@angular/core';

@Component({
  selector: 'app-etudiant-dashboard',
  template: `
    <div class="container mt-4">
      <h2 class="dashboard-title">Bonjour, Étudiant</h2>
      <div class="row g-4">
        <div class="col-md-6 col-sm-12">
          <div class="card student-card">
            <div class="card-header student-card-header">
              <img src="https://cdn-icons-png.flaticon.com/512/5402/5402751.png" alt="Catalogue" class="card-icon"/>
              <span>Catalogue des cours</span>
            </div>
            <div class="card-body">
              <p class="card-text">Parcourir et s'inscrire aux cours disponibles.</p>
              <a routerLink="catalog" class="btn btn-primary btn-sm">Voir le catalogue</a>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="card student-card">
            <div class="card-header student-card-header">
              <img src="https://cdn-icons-png.flaticon.com/512/7505/7505390.png" alt="Inscriptions" class="card-icon"/>
              <span>Mes Inscriptions & Notes</span>
            </div>
            <div class="card-body">
              <p class="card-text">Voir vos cours actuels et vos résultats.</p>
              <a routerLink="inscriptions" class="btn btn-primary btn-sm">Consulter</a>
            </div>
          </div>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .dashboard-title {
      font-weight: 700;
      color: #0d3b66;
      margin-bottom: 2rem;
      font-size: 1.8rem;
      letter-spacing: 0.5px;
    }

    .student-card {
      border-radius: 12px;
      background-color: #fdfdfd;
      box-shadow: 0 6px 15px rgba(0,0,0,0.08);
      transition: transform 0.3s, box-shadow 0.3s;
      overflow: hidden;
    }
    .student-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 28px rgba(0,0,0,0.15);
    }

    .student-card-header {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      padding: 1rem;
      background: linear-gradient(135deg, #1E88E5, #42A5F5);
      color: #fff;
      font-weight: 600;
      font-size: 1.15rem;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }

    .card-icon {
      width: 36px;
      height: 36px;
    }

    .card-body {
      padding: 1rem;
    }

    .card-text {
      color: #495057;
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }

    .btn-primary {
      background-color: #1E88E5;
      border-color: #1E88E5;
      font-weight: 500;
      transition: background-color 0.3s, transform 0.2s;
    }
    .btn-primary:hover {
      background-color: #1565C0;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .dashboard-title { font-size: 1.5rem; }
      .student-card-header { font-size: 1rem; gap: 0.5rem; }
      .card-icon { width: 32px; height: 32px; }
    }
  `]
})
export class EtudiantDashboardComponent { }
