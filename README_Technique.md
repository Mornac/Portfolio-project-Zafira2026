# ⭐ Zafira Solidaire — README Technique

Application web fullstack pour l'association Zafira Solidaire. Stack : **Next.js 15** (frontend SSR) · **NestJS** (backend API REST) · **PostgreSQL** (base de données) · **Docker** (containerisation).

---

## Table des matières

1. [Prérequis](#1-prérequis)
2. [Architecture du projet](#2-architecture-du-projet)
3. [Variables d'environnement](#3-variables-denvironnement)
4. [Installation et lancement](#4-installation-et-lancement)
5. [Structure des répertoires](#5-structure-des-répertoires)
6. [Base de données & Prisma](#6-base-de-données--prisma)
7. [Authentification](#7-authentification)
8. [API — Endpoints principaux](#8-api--endpoints-principaux)
9. [Tests](#9-tests)
10. [Déploiement en production](#10-déploiement-en-production)
11. [Dépannage](#11-dépannage)

---

## 1. Prérequis

| Outil | Version minimale | Vérification |
|---|---|---|
| Node.js | 20.x LTS | `node -v` |
| npm | 10.x | `npm -v` |
| Docker & Docker Compose | 24.x / 2.x | `docker -v` |
| Git | 2.x | `git -v` |

> PostgreSQL n'a pas besoin d'être installé en local si Docker est utilisé.

---

## 2. Architecture du projet

```
┌─────────────────┐     HTTPS      ┌────────────────┐
│  Client Browser │ ◄────────────► │  Next.js 15 SSR│  :3000
└─────────────────┘                │  /app/frontend │
        │                          └───────┬────────┘
        │                                  │ API Calls (REST)
        │                         ┌────────▼────────┐
        │                Google OAuth │   NestJS API    │  :3001
        │                HelloAsso ──►│  /app/backend   │
        │                WeezEvent    └────────┬────────┘
        │                                      │
        │                                      │
        │                             ┌────────▼──────┐
        │                             │   PostgreSQL  │
        │                             │     :5432     │
        │                             └───────────────┘
        │
        │ analytics.js (service externe — indépendant)
        ▼
┌──────────────────────────────┐
│  api.hugochilemme.com        │
│  (analytics tiers)           │
└──────────────────────────────┘
```

**Modules NestJS :** `AuthModule` · `UserModule` · `BlogModule` · `ActionModule` · `TestimonialModule` · `PartnerModule` · `StatisticModule` · `NotificationModule` · `SchedulerModule`

### Analytics tiers — `api.hugochilemme.com`

Le site intègre un script d'analytics custom chargé côté client. Il est **indépendant du backend NestJS** et ne nécessite aucune configuration de déploiement.

| Propriété | Valeur |
|---|---|
| Script | Chargé via `<script>` dans le HTML |
| Endpoint | `https://api.hugochilemme.com/api/v1/analytics` |
| Données collectées | Page views, clics, durée session, device ID |
| Consentement | Bandeau cookies intégré (accepter / refuser) |
| Stockage côté client | `localStorage` — clés `cookieConsent`, `websiteDeviceId` |
| Sans consentement | ID aléatoire généré à chaque visite, non persisté |

> Ce service est externe et géré séparément. En cas d'indisponibilité de `api.hugochilemme.com`, le site fonctionne normalement — les erreurs analytics sont silencieuses (`.catch(() => {})`).

**Événements trackés :** `page_view` · `dynamic_page_view` · `new_visitor` · `new_session` · `session_reload` · `button_click` · `clickable_item_click` · `drag_start` · `drag_drop` · `right_click` · `accepted_cookies`

---

## 3. Variables d'environnement

### `.env.example`

```env
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB_NAME
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
NEXT_PUBLIC_API_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
DEBUG=true

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

# Seed - comptes administrateurs initialement créés
SEED_ADMIN_EMAIL=admin_email
SEED_ADMIN_PASSWORD=admin_password
SEED_ADMIN2_EMAIL=admin2_email
SEED_ADMIN2_PASSWORD=admin2_password
SEED_ADMIN3_EMAIL=admin3_email
SEED_ADMIN3_PASSWORD=admin3_password
```

> **⚠️ Ne jamais committer les fichiers `.env`**. Des fichiers `.env.example` sont disponibles à la racine de chaque dossier.

---

## 4. Installation et lancement

### Option A — Docker (recommandé)

Lance l'ensemble de la stack (frontend, backend, PostgreSQL, Redis) en une seule commande.

```bash
# 1. Cloner le dépôt
git clone https://github.com/Mornac/Portfolio-project-Zafira2026
cd zafira-solidaire

# 2. Copier les fichiers d'environnement
cp .env.example app/backend/.env
cp .env.example app/frontend/.env.local
# → Remplir les variables

# 3. Lancer tous les services
docker compose up --build

# Services disponibles :
# Frontend  → http://localhost:3000
# Backend   → http://localhost:3001
# Adminer   → http://localhost:8080
```

Pour arrêter :

```bash
docker compose down
# Avec suppression des volumes (reset BDD) :
docker compose down -v
```

---

### Option B — Installation manuelle

#### Backend (NestJS)

```bash
cd app/backend

# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev

# (Optionnel) Seed de données initiales
npx prisma db seed

# Lancer en développement
npm run start:dev
# → API disponible sur http://localhost:3001
```

#### Frontend (Next.js)

```bash
cd app/frontend

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
# → App disponible sur http://localhost:3000
```

---

## 5. Structure des répertoires

```
zafira-solidaire/
├── app/
│   ├── backend/                  # NestJS API
│   │   ├── src/
│   │   │   ├── auth/             # Module authentification (JWT, Google OAuth)
│   │   │   ├── user/             # Module utilisateurs
│   │   │   ├── blog/             # Module articles
│   │   │   ├── action/           # Module prestations
│   │   │   ├── testimonial/      # Module témoignages
│   │   │   ├── partner/          # Module partenaires
│   │   │   ├── statistic/        # Module statistiques (manuel + auto)
│   │   │   ├── notification/     # Emails SendGrid
│   │   │   └── scheduler/        # Tâches cron (sync Redis → PostgreSQL)
│   │   ├── prisma/
│   │   │   ├── schema.prisma     # Schéma base de données
│   │   │   └── migrations/       # Migrations Prisma
│   │   │   └── seed.ts           # Données initiales
│   │   └── test/                 # Tests E2E (Jest + Supertest)
│   │
│   └── frontend/                 # Next.js 15
│       ├── app/
│       │   ├── (auth)/           # Pages login / register (route group)
│       │   ├── blog/             # Pages blog publiques
│       │   ├── actions/          # Pages prestations
│       │   ├── dashboard/
│       │   │   ├── admin/        # Dashboard administrateur (protégé)
│       │   │   └── beneficiary/  # Dashboard bénéficiaire (protégé)
│       │   ├── layout.tsx        # Layout racine (AuthProvider, Navbar, Footer)
│       │   └── page.tsx          # Homepage
│       ├── components/           # Composants réutilisables
│       ├── lib/
│       │   ├── api/              # Fonctions d'appel API (fetch)
│       │   ├── context/          # AuthContext (React Context)
│       │   └── hooks/            # Hooks personnalisés
│       │   └── utils/            # cn.ts
│       └── public/               # Assets statiques
│
├── docker-compose.yml
└── README.md
```

---

## 6. Base de données & Prisma

### Commandes essentielles

```bash
# Créer et appliquer une nouvelle migration
npx prisma migrate dev --name nom_de_la_migration

# Appliquer les migrations en production (sans prompt)
npx prisma migrate deploy

# Ouvrir Prisma Studio (interface visuelle BDD)
npx prisma studio

# Réinitialiser complètement la base (⚠️ supprime toutes les données)
npx prisma migrate reset
```

### Entités principales

| Table | Description |
|---|---|
| `User` | Utilisateurs (ADMIN / BENEFICIARY) |
| `Credential` | Abstraction d'authentification |
| `PasswordCredential` | Auth locale (email + hash bcrypt) |
| `GoogleCredential` | Auth Google OAuth |
| `Blog` | Articles avec slug, média, statut publié |
| `Action` | Prestations de l'association |
| `Testimonial` | Témoignages bénéficiaires (workflow validation) |
| `Partner` | Partenaires |
| `Statistic` | Statistiques globales |
| `ManualStatistic` | Compteurs saisis manuellement |
| `AutoStatistic` | Statistiques calculées automatiquement |

---

## 7. Authentification

L'application supporte deux modes d'authentification.

### Auth locale (email + mot de passe)

```
POST /api/auth/register   → Inscription + envoi email vérification
POST /api/auth/login      → Connexion → retourne access_token + refresh_token
POST /api/auth/logout     → Suppression du refresh token
POST /api/auth/refresh    → Renouvellement de l'access token
```

### Google OAuth

```
GET  /api/auth/google              → Redirige vers Google
GET  /api/auth/google/callback     → Callback Google → génère JWT
```

### Gestion des tokens

- **Access token** : durée 15 min, stocké en mémoire côté client
- **Refresh token** : durée 7 jours, stocké en `httpOnly cookie` (protégé XSS)
- **Rôles** : `ADMIN` ou `BENEFICIARY` — contrôlés via `@Roles()` + `RolesGuard`

### Routes protégées

Toutes les routes `/api/admin/*` nécessitent un JWT valide avec `role: ADMIN`. Les routes `/api/user/*` nécessitent un JWT valide (tout rôle).

---

## 8. API — Endpoints principaux

La documentation complète est disponible via **Swagger** à `http://localhost:3001/api/` en production

### Authentification

| Méthode | Endpoint | Accès | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Inscription |
| POST | `/api/auth/login` | Public | Connexion |
| GET | `/api/auth/google` | Public | OAuth Google |
| POST | `/api/auth/refresh` | Public | Refresh token |
| POST | `/api/auth/logout` | Auth | Déconnexion |

### Blog

| Méthode | Endpoint | Accès | Description |
|---|---|---|---|
| GET | `/blogs/public` | Public | Articles publiés (homepage) |
| GET | `/blogs` | Auth | Tous les articles (admin) |
| GET | `/blogs/:id` | Auth | Article par ID |
| GET | `/blogs/slug/:slug` | Public | Article par slug (SSR) |
| POST | `/blogs` | Auth | Créer un article |
| PATCH | `/blogs/:id` | Auth | Modifier un article |
| DELETE | `/blogs/:id` | Auth | Supprimer un article |

### Témoignages

| Méthode | Endpoint | Accès | Description |
|---|---|---|---|
| POST | `/testimonials` | Auth | `createTestimonial()` | Soumettre un témoignage |
| GET | `/testimonials` | Admin | `getTestimonials()` | Tous les témoignages |
| GET | `/testimonials/me` | Auth | `getMyTestimonials()` | Mes témoignages |
| PATCH | `/testimonials/:id/validate` | Admin | `validateTestimonial()` | Valider |
| PATCH | `/testimonials/:id/unvalidate` | Admin | `unvalidateTestimonial()` | Dévalider |
| PATCH | `/testimonials/:id/publish` | Admin | `publishTestimonial()` | Publier |
| PATCH | `/testimonials/:id/unpublish` | Admin | `unpublishTestimonial()` | Dépublier |
| DELETE | `/testimonials/:id` | Admin | `deleteTestimonial()` | Supprimer |

### Statistiques

| Méthode | Endpoint | Accès | Description |
|---|---|---|---|
| GET | `/stats/daily/today` | Public | `getDailyVisits()` | Visites du jour → `DailyVisitDto` |
| GET | `/stats/monthly/current` | Public | `getCurrentMonthVisits()` | Visites du mois → `MonthlyVisitDto` |
| GET | `/stats/global` | Public | `getGlobalStats()` | Total visiteurs → `GlobalStatsDto` |
| POST | `/stats/hit` | Public | `recordVisit()` | Enregistre une visite (daily + monthly + global) |
| GET | `/user/count` | Public | `getTotalUsers()` | Nombre total d'utilisateurs → `UsersCountDto` |

---

## 9. Tests

### Backend

```bash
cd app/backend

# Tests unitaires
npm run test

# Tests E2E
npm run test:e2e

# Couverture de code
npm run test:cov
```

La configuration E2E est définie dans `test/jest-e2e.json` : détection des fichiers `*.e2e-spec.ts`, transform via `ts-jest`, environnement `node`.

Exemple de test E2E existant (`test/app.e2e-spec.ts`) :

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
```

### Frontend

Le frontend n'utilise pas de tests unitaires automatisés (Jest/Testing Library). Les tests sont réalisés via des **pages de test visuel** intégrées directement dans l'application Next.js, accessibles en développement.

| Route | Fichier | Description |
|---|---|---|
| `/test/footer` | `app/test/footer/page.tsx` | Rendu visuel du composant `Footer` avec fond et couleurs CSS variables |
| — | `app/test/footer/footerTest.tsx` | Variante du composant de test (sans variables CSS) |

```bash
# Lancer le frontend en dev puis ouvrir dans le navigateur
cd app/frontend
npm run dev

# Accéder à la page de test
open http://localhost:3000/test/footer
```

> **⚠️** Ces routes de test sont uniquement destinées au développement local. Elles doivent être bloquées en production (via middleware de redirection selon `NODE_ENV`).

### Tests manuels

- **Swagger UI** → `http://localhost:3001/api/` — tester chaque endpoint avec authentification
- **Postman** — importer la collection disponible dans `docs/postman_collection.json`
- **Navigation manuelle** → parcourir les pages publiques, dashboard admin et dashboard bénéficiaire en local

---

## 10. Déploiement en production

### Variables d'environnement à modifier

```env
# Backend
NODE_ENV=production
DATABASE_URL="postgresql://USER:PASSWORD@prod-host:5432/zafira_db"
FRONTEND_URL=https://www.zafirasolidaire.org
JWT_SECRET=<clé longue aléatoire sécurisée>
JWT_REFRESH_SECRET=<clé longue aléatoire sécurisée>

# Frontend
NEXT_PUBLIC_API_BASE=https://api.zafirasolidaire.org/api
API_BASE_SSR=http://backend:3001/api
```

### Build

```bash
# Backend
cd app/backend
npm run build
npm run start:prod

# Frontend
cd app/frontend
npm run build
npm run start
```

### Migrations en production

```bash
# ⚠️ Toujours utiliser migrate deploy (pas migrate dev) en production
npx prisma migrate deploy
```

### Docker en production

```bash
docker compose -f docker-compose.prod.yml up -d
```

### Procédure de mise à jour

```bash
git pull
npx prisma migrate deploy
docker compose -f docker-compose.prod.yml up --build -d
```
---

## 11. Dépannage

### Erreur de migration Prisma

```bash
# Symptôme : P3015 Could not find the migration file
rm -rf prisma/migrations/<nom_de_la_migration>
npx prisma migrate dev --name <nom_de_la_migration>
npx prisma migrate deploy
```

### Erreur de connexion PostgreSQL

Vérifier que le service est bien démarré et que `DATABASE_URL` est correct :

```bash
docker compose ps
# ou
pg_isready -h localhost -p 5432
```

### Port déjà utilisé

```bash
# Identifier le processus
lsof -i :3000
lsof -i :3001

# Tuer le processus
kill -9 <PID>
```

### Régénérer le client Prisma après modification du schéma

```bash
npx prisma generate
```

---

## Contacts & liens utiles

- **Prisma Studio** : `npx prisma studio` → `http://localhost:5555`
- **Documentation Prisma** : https://www.prisma.io/docs
- **Documentation NestJS** : https://docs.nestjs.com
- **Documentation Next.js** : https://nextjs.org/docs
