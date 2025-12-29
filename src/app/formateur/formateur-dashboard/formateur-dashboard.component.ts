import { Component } from '@angular/core';

@Component({
  selector: 'app-formateur-dashboard',
  template: `
    <div class="container mt-4">
      <h2 class="dashboard-title">Espace Formateur</h2>
      <div class="row g-4">
        <div class="col-md-6 col-sm-12">
          <div class="card course-card">
            <div class="card-header course-card-header">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Cours" class="course-icon"/>
              <span>Mes Cours</span>
            </div>
            <div class="card-body">
              <p class="card-text">Gérer vos cours et les notes des étudiants.</p>
              <a routerLink="cours" class="btn btn-primary">Voir mes cours</a>
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

    .course-card {
      border-radius: 12px;
      background-color: #fdfdfd; /* blanc cassé */
      box-shadow: 0 6px 15px rgba(0,0,0,0.08);
      transition: transform 0.3s, box-shadow 0.3s;
      overflow: hidden;
    }
    .course-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 28px rgba(0,0,0,0.15);
    }

    .course-card-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      background: linear-gradient(135deg, #1E88E5, #42A5F5);
      color: #fff;
      font-weight: 600;
      font-size: 1.2rem;
    }

    .course-icon {
      width: 32px;
      height: 32px;
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
      .course-card-header { font-size: 1rem; gap: 0.3rem; }
      .course-icon { width: 28px; height: 28px; }
    }
  `]
})
export class FormateurDashboardComponent { }
