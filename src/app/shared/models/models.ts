export enum Role {
    ADMIN = 'ADMIN',
    FORMATEUR = 'FORMATEUR',
    ETUDIANT = 'ETUDIANT'
}

export interface User {
    id?: number;
    email: string;
    password?: string;
    role: Role;
    nom?: string;
    prenom?: string;
    token?: string;
}

export interface Etudiant extends User {
    dateInscription?: Date;
}

export interface Formateur extends User {
    specialite?: string;
}

export interface Cours {
    id?: number;
    nom: string; // correspond à la colonne "nom" dans ta table SQL
    description?: string;
    formateur?: Formateur;  // optionnel si tu récupères l'objet complet
    formateurId?: number;   // ou juste l'id
}
// Inscription
export interface Inscription {
    id?: number;
    etudiant: Etudiant;
    cours: Cours;
    date?: string; // correspond à date d'inscription en SQL
    valide?: boolean; // si tu veux gérer la colonne 'valide' (bit)
}

// Note
export interface Note {
    id?: number;
    etudiant: Etudiant;
    cours: Cours;
    valeur: number;
    remarque?: string;
}
export interface Groupe {
    id?: number;
    code: string;
    niveau?: string;
}

export interface AffectationCours {
    id?: number;
    cours: Cours;
    formateur?: Formateur;
    groupe?: Groupe;
    annee: string;
    semestre?: string;
    volumeHoraire?: number;
}