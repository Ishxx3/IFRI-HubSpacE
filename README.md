# IFRIhubSpace

IFRIhubSpace est la plateforme numérique de l'Institut de Formation et de Recherche en Informatique (IFRI). Cette application web moderne offre un espace centralisé pour les étudiants, permettant l'accès aux cours, emplois du temps, événements, et plus encore.

## Fonctionnalités

- 🎓 Gestion du profil étudiant
- 📚 Accès aux cours et ressources pédagogiques
- 📅 Consultation de l'emploi du temps
- 📄 Demande de documents administratifs
- 👥 Espace communautaire
- 🎯 Suivi des événements
- 💬 Assistant virtuel

## Prérequis

- Node.js (version 18 ou supérieure)
- npm (inclus avec Node.js)
- Un compte Supabase pour la base de données

## Installation

1. Clonez le dépôt :
```bash
git clone [url-du-depot]
cd ifrihubspace
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
   - Créez un fichier `.env` à la racine du projet
   - Ajoutez les variables suivantes :
   ```
   VITE_SUPABASE_URL=votre_url_supabase
   VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase
   ```

4. Démarrez le serveur de développement :
```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173`

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Vérifie le code avec ESLint

## Technologies utilisées

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- React Router
- Lucide React

## Structure du projet

```
src/
  ├── components/     # Composants React
  ├── lib/           # Utilitaires et configuration
  ├── types/         # Types TypeScript
  ├── App.tsx        # Composant principal
  └── main.tsx       # Point d'entrée
```

## Base de données

L'application utilise Supabase comme backend. La structure de la base de données comprend :
- Table `students` : Informations des étudiants
- Table `profiles` : Liaison avec l'authentification

## Contribution

1. Créez une branche pour votre fonctionnalité
2. Committez vos changements
3. Poussez vers la branche
4. Créez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
