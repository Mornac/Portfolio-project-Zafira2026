// src/modules/auth/app/auth.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../user/app/user.service';
import { AuthRepository } from '../infra/auth.repository';
import { MailService } from './mail.service';
import { JwtService } from '@nestjs/jwt';
import { ActivityService } from '../../activity/app/activity.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    validateUser: jest.fn(),
  };

  const mockAuthRepository   = { findCredentialByUserId: jest.fn() };
  const mockMailService      = { sendVerificationEmail: jest.fn() };
  const mockJwtService       = { sign: jest.fn().mockReturnValue('fake-jwt-token') };
  const mockActivityService  = { logActivity: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService,      useValue: mockUserService },
        { provide: AuthRepository,   useValue: mockAuthRepository },
        { provide: MailService,      useValue: mockMailService },
        { provide: JwtService,       useValue: mockJwtService },
        { provide: ActivityService,  useValue: mockActivityService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  // ── CAS 1 : login valide ──────────────────────────────────────────────
  it('retourne un token JWT si email et mot de passe sont corrects', async () => {
    // validateUser retourne un objet user avec toJSON()
    mockUserService.validateUser.mockResolvedValue({
      id: 'uuid-123',
      email: 'test@zafira.fr',
      role: 'BENEFICIARY',
      toJSON: () => ({ id: 'uuid-123', email: 'test@zafira.fr', role: 'BENEFICIARY' }),
    });

    const result = await service.login('test@zafira.fr', 'password123');

    expect(result).toHaveProperty('access_token');
    expect(result.access_token).toBe('fake-jwt-token');
    expect(result).toHaveProperty('user');
  });

  // ── CAS 2 : utilisateur inconnu ───────────────────────────────────────
  it('lève une UnauthorizedException si l\'email est inconnu', async () => {
    mockUserService.validateUser.mockResolvedValue(null); // personne trouvé

    await expect(
      service.login('inconnu@zafira.fr', 'password123')
    ).rejects.toThrow(UnauthorizedException);
  });

  // ── CAS 3 : mauvais mot de passe ─────────────────────────────────────
  it('lève une UnauthorizedException si le mot de passe est incorrect', async () => {
    mockUserService.validateUser.mockResolvedValue(null); // bcrypt a échoué dans validateUser

    await expect(
      service.login('test@zafira.fr', 'mauvaisMotDePasse')
    ).rejects.toThrow(UnauthorizedException);
  });
});
