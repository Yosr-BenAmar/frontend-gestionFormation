import { Role } from '../models/models';

export const USERS = [
    {
        id: 1,
        email: 'admin@test.com',
        password: 'admin',
        nom: 'Admin',
        prenom: 'System',
        role: Role.ADMIN,
        token: 'fake-jwt-token-admin'
    },
    {
        id: 2,
        email: 'formateur@test.com',
        password: 'formateur',
        nom: 'Formateur',
        prenom: 'Test',
        role: Role.FORMATEUR,
        token: 'fake-jwt-token-formateur'
    },
    {
        id: 3,
        email: 'etudiant@test.com',
        password: 'etudiant',
        nom: 'Etudiant',
        prenom: 'Test',
        role: Role.ETUDIANT,
        token: 'fake-jwt-token-etudiant'
    }
];

export const COURS = [
    { id: 1, titre: 'Angular Basics', description: 'Introduction to Angular', dateDebut: '2023-01-01', dateFin: '2023-02-01', formateurId: 2 },
    { id: 2, titre: 'Advanced Spring Boot', description: 'Deep dive into Spring Boot', dateDebut: '2023-03-01', dateFin: '2023-04-01', formateurId: 2 }
];

export const FORMATEURS = [
    { id: 2, nom: 'Formateur', prenom: 'Test', email: 'formateur@test.com' }
];

export const ETUDIANTS = [
    { id: 3, nom: 'Etudiant', prenom: 'Test', email: 'etudiant@test.com' }
];

export const INSCRIPTIONS = [
    { id: 1, etudiantId: 3, coursId: 1, dateInscription: '2023-01-02' }
];
