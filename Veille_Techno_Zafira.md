# Journal de veille — Zafira Solidaire

**Projet :** Zafira Solidaire — Plateforme web associative fullstack  
**Candidat·e :** Ingrid MORNAC — RNCP5 DWWM — Holberton School Toulouse  
**Période :** Août 2025 – Mars 2026

---

## Sources de veille

| Catégorie | Source | URL |
|-----------|--------|-----|
| Sécurité web | OWASP Top 10 | https://owasp.org/www-project-top-ten/ |
| Sécurité web | OWASP Cheat Sheet Series | https://cheatsheetseries.owasp.org/ |
| Sécurité web | OWASP REST Security | https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html |
| CVE & alertes | GitHub Advisory Database | https://github.com/advisories |
| CVE & alertes | NVD — National Vulnerability Database | https://nvd.nist.gov/ |
| CVE & alertes | PostgreSQL Security Advisories | https://www.postgresql.org/support/security/ |
| CVE & alertes | Snyk Vulnerability DB | https://security.snyk.io/ |
| Automatique | GitHub Dependabot | https://docs.github.com/en/code-security/dependabot |
| Automatique | npm audit | https://docs.npmjs.com/cli/v10/commands/npm-audit |
| Blog / actu | The Hacker News | https://thehackernews.com/ |
| Blog / actu | Socket.dev | https://socket.dev/ |
| Framework | NestJS Releases | https://github.com/nestjs/nest/releases |
| Framework | Next.js Security Advisories | https://github.com/vercel/next.js/security/advisories |

---

## Fréquence

| Fréquence | Action |
|-----------|--------|
| Chaque push Git | `npm audit` avant tout déploiement — bloquant si vulnérabilité critique |
| Hebdomadaire | Consultation GitHub Dependabot — vérification CVE des dépendances du projet |
| Mensuelle | Lecture The Hacker News, socket.dev, release notes NestJS / Next.js |
| Ponctuelle | Lecture OWASP Cheat Sheet lors de l'implémentation d'une nouvelle fonctionnalité |

---

## Journal de veille

| Date | Source | Faille / Alerte | Action effectuée | Vérification |
|------|--------|-----------------|------------------|--------------|
| 2026-01-10 | [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) | Recommandation stockage JWT — `localStorage` vulnérable XSS | Cookie `HttpOnly` + `sameSite: lax` dans `AuthController` NestJS | DevTools confirment flag `HttpOnly`. Tests Supertest ✅ |
| 2026-01-15 | [GitHub Advisory GHSA-qwph-4952-7xr6](https://github.com/advisories/GHSA-qwph-4952-7xr6) | **CVE-2022-23540** — `jsonwebtoken` ≤ 8.5.1 : contournement validation de signature (CVSS 5.3) | `npm install jsonwebtoken@9.0.3` — algorithme explicite dans `jwt.verify()` | Tests Jest `authService` : 100% passés. `npm audit` propre ✅ |
| 2026-01-20 | [GitHub Dependabot](https://docs.github.com/en/code-security/dependabot) + [Prisma Releases](https://github.com/prisma/prisma/releases) | Prisma Client — version obsolète signalée (correctifs sécurité mineurs) | `npm update @prisma/client prisma` + `npx prisma generate` | Tests intégration BDD : aucune régression ✅ |
| 2026-01-22 | [OWASP CSRF Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) | CSRF sur Next.js — cookies envoyés automatiquement sur requêtes cross-origin | Ajout `sameSite: 'lax'` sur cookie JWT. Vérification CORS (`ALLOWED_ORIGIN`) | Test depuis `localhost:4000` : requête rejetée 401 ✅ |
| 2026-02-01 | [PostgreSQL CVE-2025-1094](https://www.postgresql.org/support/security/CVE-2025-1094/) | **CVE-2025-1094** — PostgreSQL < 16.7 : injection SQL via libpq encodage BIG5 | Image Docker `postgres:16.6-alpine` → `postgres:16.7-alpine` | Migrations Prisma rejouées, CRUD vérifié. Impact faible (Prisma = requêtes paramétrées) ✅ |

---

## Détail des alertes traitées

### Alerte 1 — Stockage JWT (2026-01-10)

**Source :** [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)

**Risque :** Stocker le JWT dans `localStorage` l'expose à toute faille XSS — un script malveillant peut lire `window.localStorage` et voler le token.

**Correction appliquée dans `auth.controller.ts` :**

```typescript
res.cookie('auth_token', access_token, {
  httpOnly: true,       // inaccessible au JavaScript
  sameSite: 'lax',     // protection CSRF
  secure: true,         // HTTPS uniquement en production
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
```

**Vérification :** DevTools > Application > Cookies — flag `HttpOnly` confirmé. Tests Supertest sur `/auth/login` : cookie présent dans `Set-Cookie`.

---

### Alerte 2 — CVE-2022-23540 jsonwebtoken (2026-01-15)

**Source :** [GitHub Advisory GHSA-qwph-4952-7xr6](https://github.com/advisories/GHSA-qwph-4952-7xr6)  
**CVE :** CVE-2022-23540 — CVSS 5.3 (Modérée)

**Risque :** Dans les versions ≤ 8.5.1 de `jsonwebtoken`, l'absence de définition d'algorithme dans `jwt.verify()` peut permettre à un token non signé (`alg: none`) de passer la vérification.

**Correction :**

```bash
npm install jsonwebtoken@9.0.3
```

Vérification que `algorithms` est explicitement défini dans la `JwtStrategy` :

```typescript
jwt.verify(token, secret, { algorithms: ['HS256'] });
```

**Vérification :** Tests Jest `authService.login()` (valide / invalide / malveillant) : tous passés. `npm audit` : 0 vulnérabilité.

---

### Alerte 3 — Mise à jour Prisma (2026-01-20)

**Source :** GitHub Dependabot + [Prisma Releases](https://github.com/prisma/prisma/releases)

**Alerte :** Version de Prisma Client obsolète détectée automatiquement par Dependabot.

**Correction :**

```bash
npm update @prisma/client prisma
npx prisma generate
```

**Vérification :** Tests d'intégration BDD (Create / Read / Update / Delete) sur `User`, `Blog`, `Testimonial` : aucune régression.

---

### Alerte 4 — CSRF Next.js (2026-01-22)

**Source :** [OWASP CSRF Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

**Risque :** Le CSRF exploite l'envoi automatique des cookies par le navigateur. Un site malveillant peut forger une requête authentifiée vers notre API.

**Correction :** Attribut `sameSite: 'lax'` sur le cookie (voir Alerte 1) + configuration CORS NestJS :

```typescript
app.enableCors({
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true,
});
```

**Vérification :** Requête POST depuis `localhost:4000` (domaine non autorisé) → rejetée 401.

---

### Alerte 5 — CVE-2025-1094 PostgreSQL (2026-02-01)

**Source :** [PostgreSQL Security — CVE-2025-1094](https://www.postgresql.org/support/security/CVE-2025-1094/)

**CVE :** CVE-2025-1094 — Neutralisation incorrecte du quoting dans `libpq`. Injection SQL possible dans des contextes d'encodage BIG5. Affecte PostgreSQL < 16.7.

**Correction :**

```yaml
# docker-compose.yml et docker-compose.prod.yml
image: postgres:16.7-alpine   # était postgres:16.6-alpine
```

```bash
docker compose pull
docker compose up --build -d
```

**Note :** Impact faible sur Zafira — toutes les requêtes passent par Prisma ORM (requêtes paramétrées, pas de `libpq` directement). Mise à jour appliquée par principe de précaution.

**Vérification :** Migrations Prisma rejouées sur la nouvelle image. CRUD testé : aucune régression.

---

## Bilan

5 alertes identifiées, analysées et traitées sur la durée du projet.  
Chaque correction a été suivie de tests de non-régression (Jest, Supertest, tests manuels).  
`npm audit` au moment de la soutenance : **0 vulnérabilité critique ou élevée**.
