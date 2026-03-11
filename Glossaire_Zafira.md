# GLOSSAIRE ZAFIRA

## A

**Agile / Scrum**
Méthodologie et cadre de gestion de projet basés sur l'itération, l'amélioration continue et les sprints courts (généralement 2 semaines) permettant une adaptation rapide aux changements.
*Pages : 26*

**API (Application Programming Interface)**
Interface de programmation permettant la communication structurée entre le front-end et le back-end de Zafira via des requêtes HTTP et des réponses JSON.
*Pages : 5, 6, 10, 16, 20, 21, 22, 25, 28, 29*

**Architecture hexagonale**
Modèle architectural séparant la logique métier de Zafira des interfaces externes (API, base de données, services tiers) pour améliorer la testabilité et la maintenabilité du code.
*Pages : 5, 7, 20, 23*

**Architecture hexagonale NestJS**
Implémentation spécifique de l'architecture hexagonale dans le framework NestJS, utilisant des modules, services et repositories pour séparer les couches applicatives.
*Pages : 7, 8*

**Architecture modulaire**
Organisation du code en modules indépendants et réutilisables pour faciliter la maintenance, l'évolution et la scalabilité de Zafira.
*Page : 24*

**Authentification**
Processus de vérification sécurisée de l'identité des utilisateurs de Zafira via email/mot de passe ou OAuth, généralement avec génération de tokens JWT.
*Pages : 5, 10, 16, 18, 20, 21, 22, 25, 26, 29*

---

## B

**Backend**
Partie serveur de Zafira développée avec NestJS, gérant la logique métier, les API REST, l'accès à la base de données PostgreSQL et les mécanismes de sécurité.
*Pages : 5, 6, 7, 16, 18, 20, 22, 23, 26, 29*

**Base de données**
Système de gestion de données relationnelles PostgreSQL utilisé pour stocker de manière structurée et persistante toutes les informations de Zafira (utilisateurs, événements, transactions).
*Pages : 6, 10, 16, 20, 23, 29*

**Bcrypt**
Algorithme de hachage cryptographique utilisé pour sécuriser le stockage des mots de passe des utilisateurs en les rendant non réversibles.
*Pages : 7, 16*

---

## C

**Controllers**
Composants NestJS qui gèrent les requêtes HTTP entrantes, délèguent le traitement aux services et retournent les réponses appropriées aux clients.
*Pages : 7, 20, 23, 25, 29*

**Cookie HttpOnly**
Cookie sécurisé inaccessible au JavaScript côté client, utilisé pour stocker les tokens JWT et prévenir les attaques XSS (Cross-Site Scripting).
*Pages : 7, 10, 16, 20, 28*

**Cookies**
Petits fichiers de données stockés côté navigateur pour gérer les sessions utilisateur, les préférences et l'authentification dans Zafira.
*Pages : 7, 10, 15, 16, 20, 28*

**CORS (Cross-Origin Resource Sharing)**
Mécanisme de sécurité HTTP permettant au backend Zafira d'autoriser ou refuser les requêtes provenant de domaines différents.
*Pages : 7, 28*

**Create a showcase page to attract institutional investors**
Objectif de créer une page vitrine professionnelle de Zafira pour présenter la plateforme et attirer des investisseurs institutionnels potentiels.
*Page : 11*

**CSR (Client-Side Rendering)**
Méthode de rendu où le contenu est généré côté client par JavaScript, utilisée dans certaines parties de Zafira pour des interactions dynamiques.
*Page : 37*

---

## D

**Déploiement**
Processus de mise en production de Zafira sur un serveur ou une infrastructure cloud, incluant configuration, migration de données et monitoring.
*Pages : 5, 6, 7, 20*

**Docker**
Technologie de conteneurisation permettant d'empaqueter Zafira et ses dépendances dans des conteneurs isolés pour garantir la cohérence des environnements (développement, test, production).
*Pages : 5, 6, 7, 20, 28*

**DTO (Data Transfer Object)**
Objet structuré définissant le format et la validation des données échangées entre le client et l'API Zafira, garantissant la cohérence et la sécurité des transferts.
*Pages : 7, 16, 20, 22, 29*

---

## E

**Endpoint / Endpoints**
Point d'accès spécifique d'une API REST identifié par une URL et une méthode HTTP (ex : POST /api/auth/login). Ensemble des points d'accès exposés par le backend Zafira pour les opérations CRUD et les fonctionnalités métier.
*Pages : 10, 16, 18, 20, 22, 28, 29*

---

## F

**Fetch**
API JavaScript native permettant d'effectuer des requêtes HTTP asynchrones vers le backend de Zafira depuis le navigateur.
*Pages : 6, 10, 16*

**Fichiers .env**
Fichiers de configuration contenant les variables d'environnement sensibles de Zafira (clés API, secrets JWT, URLs de base de données) non versionnés dans Git.
*Pages : 6, 20, 22*

**Framework**
Cadre de développement logiciel fournissant une structure et des outils pour construire Zafira (Next.js pour le frontend, NestJS pour le backend).
*Pages : 20, 23, 29*

**Frontend**
Partie client de Zafira développée avec Next.js et React, gérant l'interface utilisateur, les interactions et l'affichage des données.
*Pages : 5, 6, 7, 16, 20, 22, 23, 26, 28, 29*

---

## G

**Gantt (Diagramme de)**
Outil visuel de planification représentant les tâches, sprints et jalons du projet Zafira sur une ligne temporelle.
*Pages : 21, 27*

**Git**
Système de contrôle de version distribué permettant de suivre l'historique des modifications du code source de Zafira et de collaborer efficacement.
*Pages : 6, 28*

**GitHub**
Plateforme web d'hébergement et de collaboration pour les dépôts Git de Zafira, incluant gestion des issues, pull requests et documentation.
*Pages : 20, 28*

**Google Search Console**
Outil gratuit de Google pour surveiller et optimiser la présence de Zafira dans les résultats de recherche, analyser le trafic organique et détecter les problèmes SEO.
*Page : 16*

**Guards**
Mécanismes de protection dans NestJS contrôlant l'accès aux routes de l'API selon l'authentification, les rôles ou les permissions des utilisateurs.
*Pages : 7, 16, 20, 22, 25*

---

## H

**HelloAsso**
Plateforme française de paiement en ligne et de billetterie pour associations, intégrée dans Zafira pour gérer les dons financiers.
*Pages : 11, 13, 29*

**Hooks (React)**
Fonctions spéciales de React (useState, useEffect, useContext, etc.) permettant de gérer l'état local et les effets de bord dans les composants fonctionnels de Zafira.
*Pages : 6, 20*

**HTML (HyperText Markup Language)**
Langage de balisage standard pour structurer le contenu des pages web de Zafira, rendu côté serveur par Next.js.
*Pages : 6, 10, 16, 19, 20, 21, 25*

**HTTP (HyperText Transfer Protocol)**
Protocole de communication client-serveur utilisé par Zafira pour échanger données et commandes entre frontend et backend via les méthodes GET, POST, PUT, DELETE.
*Pages : 16, 20, 22, 29*

---

## I

**Issues**
Système de suivi des tâches, bugs et améliorations dans GitHub permettant d'organiser le développement collaboratif de Zafira.
*Pages : 10, 28*

---

## J

**JavaScript**
Langage de programmation principal utilisé côté client (navigateur) et côté serveur (Node.js) pour développer l'ensemble de Zafira.
*Pages : 7, 20*

**JSON (JavaScript Object Notation)**
Format léger et lisible d'échange de données structurées utilisé par l'API REST de Zafira pour la communication client-serveur.
*Pages : 16, 20, 22, 25*

**JWT (JSON Web Token)**
Standard de token sécurisé encodé permettant l'authentification stateless et la transmission sécurisée d'informations d'identité entre le client et le serveur Zafira.
*Pages : 5, 7, 10, 16, 18, 20, 21, 22, 25, 28*

---

## L

**Logique métier**
Ensemble des règles, processus et algorithmes spécifiques au domaine de Zafira (gestion des rôles, validation des contenus, modération) indépendants des détails techniques d'implémentation.
*Pages : 5, 7, 23, 29*

---

## M

**Maintenable**
Qualité d'un code de Zafira facile à comprendre, corriger, tester et faire évoluer grâce à une architecture claire, une documentation adéquate et des bonnes pratiques.
*Pages : 5, 6, 7, 22, 23, 29*

**Méta description**
Balise HTML décrivant le contenu d'une page Zafira en 150-160 caractères, affichée dans les résultats de recherche Google pour améliorer le taux de clic.
*Page : 16*

**Middleware**
Fonction intermédiaire dans la chaîne de traitement des requêtes HTTP, utilisée dans NestJS et Next.js pour la validation, l'authentification, le logging ou la transformation des données.
*Pages : 10, 16, 18, 20, 21, 28*

**Migrations**
Scripts de gestion des changements de schéma de base de données PostgreSQL, permettant de versionner et déployer les évolutions de structure de manière contrôlée avec Prisma.
*Pages : 7, 10, 16, 20, 28*

**MVC (Model-View-Controller)**
Pattern architectural séparant les données (Model), la présentation (View) et la logique de contrôle (Controller) pour organiser le code de Zafira.
*Pages : 5, 23, 25*

**MVP (Minimum Viable Product)**
Version minimale fonctionnelle de Zafira incluant les fonctionnalités essentielles pour valider rapidement le concept auprès des premiers utilisateurs.
*Pages : 11, 20, 21, 26*

---

## N

**NestJS**
Framework Node.js progressif et TypeScript-first structurant le backend de Zafira en architecture modulaire, avec injection de dépendances et décorateurs.
*Pages : 5, 6, 7, 10, 16, 20, 22, 25, 28, 29*

**Next.js**
Framework React open-source permettant le développement du frontend de Zafira avec rendu côté serveur (SSR), génération statique (SSG), optimisation automatique et routing intégré.
*Pages : 5, 6, 7, 10, 16, 20, 22, 25, 28, 29*

**Node.js**
Environnement d'exécution JavaScript côté serveur basé sur le moteur V8 de Chrome, utilisé pour exécuter le backend NestJS et le serveur Next.js de Zafira.
*Page : 29*

**npm (Node Package Manager)**
Gestionnaire de paquets par défaut pour Node.js permettant d'installer, mettre à jour et gérer les dépendances JavaScript de Zafira.
*Pages : 20, 28*

---

## O

**Open-source**
Modèle de développement logiciel où le code source est publiquement accessible, modifiable et redistribuable — caractéristique des outils utilisés dans Zafira (NestJS, Next.js, Prisma, PostgreSQL).
*Page : 20*

**ORM (Object-Relational Mapping)**
Technique et outil (Prisma ORM dans Zafira) permettant de manipuler la base de données PostgreSQL via des objets JavaScript/TypeScript plutôt que du SQL brut.
*Pages : 5, 7, 16, 18, 20, 22, 28, 29*

**Outils de modération**
Fonctionnalités administratives permettant de contrôler, valider, modifier ou supprimer le contenu publié par les utilisateurs de Zafira.
*Page : 16*

**OWASP (Open Web Application Security Project)**
Organisation à but non lucratif fournissant des guides et bonnes pratiques de sécurité applicative web (Top 10 des vulnérabilités) appliqués au développement de Zafira.
*Pages : 9, 22, 25, 28*

---

## P

**Pair programming**
Méthode de développement agile où deux développeurs travaillent ensemble sur le même code, améliorant la qualité et le partage de connaissances dans l'équipe Zafira.
*Page : 27*

**PostgreSQL**
Système de gestion de base de données relationnelle open-source robuste et conforme aux standards SQL, utilisé pour stocker toutes les données structurées de Zafira.
*Pages : 5, 7, 10, 16, 20, 23, 28, 29*

**Postman**
Outil de développement API permettant de tester, documenter et déboguer les endpoints REST du backend Zafira en envoyant des requêtes HTTP personnalisées.
*Page : 28*

**Prisma ORM**
ORM moderne et type-safe pour Node.js/TypeScript permettant d'interagir avec PostgreSQL dans Zafira via un schéma déclaratif, des migrations automatiques et un client auto-généré.
*Pages : 5, 7, 10, 16, 18, 20, 22, 28, 29*

**Pull requests (PR)**
Propositions de modifications du code soumises sur GitHub pour revue par l'équipe avant fusion dans la branche principale.
*Page : 28*

---

## R

**RBAC (Role-Based Access Control)**
Système de contrôle d'accès basé sur les rôles (admin, bénéficiaire, visiteur) définissant les permissions et actions autorisées pour chaque type d'utilisateur dans Zafira.
*Pages : 5, 10, 16, 28*

**React**
Bibliothèque JavaScript open-source développée par Meta pour construire des interfaces utilisateur interactives et composables, base du frontend Zafira avec Next.js.
*Pages : 5, 6, 16*

**REST (REpresentational State Transfer)**
Style d'architecture API utilisant les méthodes HTTP standard (GET, POST, PUT, DELETE) et les principes stateless pour exposer les ressources de Zafira de manière uniforme.
*Pages : 7, 10, 16, 22, 25, 28, 29*

**RGPD (Règlement Général sur la Protection des Données)**
Réglementation européenne (UE 2016/679) encadrant la collecte, le traitement et la conservation des données personnelles dans Zafira, imposant transparence, consentement et droit à l'oubli.
*Pages : 9, 19, 20, 21*

---

## S

**Scope**
Définition claire des objectifs, périmètre fonctionnel, livrables et limites du projet Zafira pour cadrer les attentes et éviter le scope creep.
*Pages : 10, 13*

**Seed**
Script Prisma permettant de peupler la base de données PostgreSQL avec des données initiales ou de test pour faciliter le développement et les démonstrations de Zafira.
*Pages : 7, 16, 20*

**SEO (Search Engine Optimization)**
Ensemble de techniques et bonnes pratiques pour optimiser le référencement naturel des pages Zafira dans les moteurs de recherche et augmenter la visibilité organique.
*Pages : 6, 7, 9, 16, 17, 20, 25, 29*

**SMART**
Méthode de définition d'objectifs (Spécifique, Mesurable, Atteignable, Réaliste, Temporellement défini) appliquée à la planification du projet Zafira.
*Pages : 10, 11, 13, 20*

**Sprints**
Périodes de travail fixes dans la méthodologie Agile/Scrum durant lesquelles l'équipe Zafira développe un ensemble défini de fonctionnalités.
*Page : 26*

**SQL (Structured Query Language)**
Langage standardisé de requêtes pour manipuler et interroger les bases de données relationnelles, abstrait par Prisma ORM dans Zafira mais utilisé en coulisses avec PostgreSQL.
*Pages : 5, 7, 16, 18, 20, 22, 28*

**SSG (Static Site Generation)**
Méthode de génération de pages HTML statiques au moment du build dans Next.js, offrant performances maximales et SEO optimal pour le contenu peu dynamique de Zafira.
*Page : 37*

**SSR (Server-Side Rendering)**
Technique de rendu côté serveur dans Next.js générant le HTML complet de la page à chaque requête, améliorant le SEO et les performances de première visite de Zafira.
*Pages : 6, 7, 10, 16, 20, 21, 25, 28*

**Swagger (OpenAPI)**
Spécification et outil de documentation interactive pour les API REST, permettant de visualiser, tester et comprendre automatiquement tous les endpoints du backend Zafira.
*Page : 28*

---

## T

**Tailwind CSS**
Framework CSS utility-first permettant de styliser rapidement et de manière responsive l'interface de Zafira via des classes utilitaires composables sans écrire de CSS personnalisé.
*Pages : 5, 6, 19*

**TypeScript**
Sur-ensemble typé de JavaScript ajoutant un système de types statiques pour détecter les erreurs à la compilation et améliorer la maintenabilité du code Zafira.
*Pages : 6, 20*

---

## U

**URL (Uniform Resource Locator)**
Adresse unique identifiant une ressource web de Zafira (page, API endpoint, fichier), composée d'un protocole, domaine, chemin et paramètres optionnels.
*Pages : 16, 20, 29*

**UUID (Universally Unique IDentifier)**
Identifiant unique universel de 128 bits utilisé comme clé primaire dans la base de données PostgreSQL de Zafira, garantissant l'unicité globale sans collision et sans prédictibilité.
*Pages : 16, 20*

---

## W

**Weezevent**
Plateforme française de billetterie en ligne et de gestion d'événements, intégrée dans Zafira pour gérer les inscriptions aux ateliers.
*Pages : 11, 13, 29*

**Wireframe**
Schéma simplifié en fil de fer représentant la structure et l'organisation des éléments d'interface de Zafira avant la phase de design visuel détaillé.
*Pages : 6, 17, 20*
