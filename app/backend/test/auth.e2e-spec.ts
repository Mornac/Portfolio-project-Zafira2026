// test/auth.e2e-spec.ts

const request = require('supertest');
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => await app.close());

  // CAS 1 : email valide mais inconnu → 401
it('POST /auth/login → 401 si utilisateur inexistant', async () => {
  await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email: 'inconnu@zafira.fr', password: 'password123' })
    .expect(401);
});

  // ── CAS 2 : email manquant → 400 ──────────────────────────────────────
  it('POST /auth/login → 400 si email manquant', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ password: 'admin123' })
      .expect(400);
  });

  // ── CAS 3 : mauvais mot de passe → 401 ────────────────────────────────
  it('POST /auth/login → 401 si mot de passe incorrect', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'mauvaisMotDePasse' })
      .expect(401);
  });

  // ── CAS 4 : route protégée sans token → 401 ───────────────────────────
  it('GET /auth/me → 401 sans cookie auth_token', async () => {
    await request(app.getHttpServer())
      .get('/auth/me')
      .expect(401);
  });
});
