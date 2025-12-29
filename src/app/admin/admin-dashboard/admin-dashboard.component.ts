import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="container mt-4">
      <h2 class="dashboard-title">Bonjour, Admin</h2>
      <div class="row g-4">
        <div class="col-md-3 col-sm-6" *ngFor="let card of cards">
          <div class="card dashboard-card" [ngStyle]="{'background': card.gradient}">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="card-top d-flex align-items-center">
                <img [src]="card.icon" alt="{{ card.title }}" class="card-icon"/>
                <h5 class="card-header">{{ card.title }}</h5>
              </div>
              <p class="card-text">{{ card.text }}</p>
              <a [routerLink]="card.link" class="btn btn-light btn-sm">Accéder</a>
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

    .dashboard-card {
      border-radius: 16px;
      overflow: hidden;
      transition: transform 0.4s, box-shadow 0.4s;
      cursor: pointer;
      min-height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #fff;
      box-shadow: 0 6px 15px rgba(0,0,0,0.08);
    }

    .dashboard-card:hover {
      transform: scale(1.03);
      box-shadow: 0 15px 35px rgba(0,0,0,0.25);
    }

    .card-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1.2rem;
    }

    .card-top {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 0.8rem;
    }

    .card-icon {
      width: 50px;
      height: 50px;
    }

    .card-header {
      font-size: 1.2rem;
      font-weight: 700;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }

    .card-text {
      font-size: 0.95rem;
      margin-bottom: 1rem;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }

    .btn-light {
      background-color: rgba(255,255,255,0.9);
      color: #0d3b66;
      font-weight: 500;
      border: none;
      transition: transform 0.2s, background-color 0.3s;
    }
    .btn-light:hover {
      background-color: #ffffff;
      transform: translateY(-2px);
      color: #0d3b66;
    }

    @media (max-width: 768px) {
      .dashboard-title { font-size: 1.5rem; }
      .card-body { flex-direction: column; }
      .card-top { justify-content: center; }
    }
  `]
})
export class AdminDashboardComponent {
  cards = [
    {
      title: 'Etudiants',
      text: 'Gérer les étudiants.',
      link: 'etudiants',
      gradient: 'linear-gradient(135deg, #1E88E5, #42A5F5)',
      icon: 'https://cdn-icons-png.flaticon.com/128/3584/3584396.png'
    },
    {
      title: 'Formateurs',
      text: 'Gérer les formateurs.',
      link: 'formateurs',
      gradient: 'linear-gradient(135deg, #1565C0, #1E88E5)',
      icon: 'https://cdn-icons-png.flaticon.com/512/2798/2798310.png'
    },
    {
      title: 'Cours',
      text: 'Gérer les cours.',
      link: 'cours',
      gradient: 'linear-gradient(135deg, #42A5F5, #64B5F6)',
      icon: 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png'
    },
    {
      title: 'Inscriptions',
      text: 'Gérer les inscriptions.',
      link: 'inscriptions',
      gradient: 'linear-gradient(135deg, #64B5F6, #90CAF9)',
      icon: 'https://cdn-icons-png.flaticon.com/512/4308/4308850.png'
    },
  ];
}
