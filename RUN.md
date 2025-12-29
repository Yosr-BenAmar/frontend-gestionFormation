# Instructions de Démarrage

## 1. Installation des dépendances
Ouvrez un terminal (Invite de commande ou PowerShell) dans le dossier du projet et exécutez :

```bash
npm install
```

> **Note :** Si vous rencontrez des erreurs de version ou de conflit, essayez :
> ```bash
> npm install --legacy-peer-deps
> ```

## 2. Configuration du Backend
Assurez-vous que votre backend Spring Boot tourne sur le port **8080** (`http://localhost:8080`).

Vérifiez que le backend autorise CORS pour `http://localhost:4200`.

## 3. Lancer l'application Frontend
Une fois les dépendances installées :

```bash
ng serve
```

Ouvrez votre navigateur sur `http://localhost:4200`.

## 4. Vérification
- Connectez-vous avec un utilisateur existant dans votre base de données Spring Boot.
- Ou assurez-vous que votre base de données est initialisée avec des rôles (ADMIN, FORMATEUR, ETUDIANT).

## 5. Résolution de problèmes courants

### Erreur "Cannot find module"
Si vous voyez des erreurs comme `Cannot find module ...`, cela signifie souvent que `npm install` n'a pas fini correctement. Relancez l'installation.

### Erreur de connexion (CORS ou 401/403)
- Vérifiez la console du navigateur (F12) -> onglet Réseau.
- Vérifiez la configuration CORS coté Spring Boot (`@CrossOrigin("*")` ou configuration globale).
