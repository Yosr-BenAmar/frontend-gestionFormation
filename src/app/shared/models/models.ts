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
    titre: string;
    description?: string;
    dateDebut: Date;
    dateFin: Date;
    formateur?: Formateur;
    formateurId?: number;
}

export interface Inscription {
    id?: number;
    etudiant: Etudiant;
    cours: Cours;
    dateInscription: Date;
}

export interface Note {
    id?: number;
    etudiant: Etudiant;
    cours: Cours;
    valeur: number;
    remarque?: string;
}
