import { User } from './../user/entity/user.entity';
import { UserRepository } from './../user/repository/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService, JwtPayload } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from './dto/access-token.dto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

// DB 의존성 Mock
class MockUserRepository {
  save = jest.fn();
  findUserBy = jest.fn();
  isExist = jest.fn();
}

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: UserRepository, useClass: MockUserRepository },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);

    // Bcrypt Stub
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation((plain: string, salt = 10) =>
        Promise.resolve(`${plain} hashed ${salt}`),
      );

    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation((plain, hashed) =>
        Promise.resolve(`${plain} hashed 10` === hashed),
      );

    // JwtService Stub
    jest
      .spyOn(jwtService, 'verifyAsync')
      .mockImplementation((mockAccessToken: string) => {
        const subStr = mockAccessToken.split('_')[1];
        return Promise.resolve({
          sub: parseInt(subStr),
        });
      });

    jest
      .spyOn(jwtService, 'signAsync')
      .mockImplementation((mockPayload: JwtPayload) =>
        Promise.resolve(`token_${mockPayload.sub}`),
      );

    // UserRepository Stub
    jest.spyOn(userRepository, 'isExist').mockImplementation((user: User) => {
      if (user.email === 'new') {
        return Promise.resolve(false);
      } else if (user.email === 'already') {
        return Promise.resolve(true);
      } else if (user.id === 1) {
        return Promise.resolve(true);
      } else if (user.id > 1) {
        return Promise.resolve(false);
      }
    });

    jest
      .spyOn(userRepository, 'findUserBy')
      .mockImplementation((user: User) => {
        if (user.email === 'already') {
          const savedUser = new User();
          savedUser.id = 1;
          savedUser.email = 'already';
          savedUser.password = 'already hashed 10';
          return Promise.resolve(savedUser);
        } else if (user.email === 'new') {
          return Promise.resolve(null);
        }
      });

    jest.spyOn(userRepository, 'save').mockImplementation((user: User) => {
      user.id = 1;
      user.setHashedPassword('new hashed 10');
      return Promise.resolve(user);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('signUp()', () => {
    // 공통으로 사용되는 객체
    const mockPayload = { sub: 1 };
    const mockAccessToken = `token_${mockPayload.sub}`;

    it('SUCCESS: 신규 유저라면 회원 가입 후 엑세스토큰 리턴', async () => {
      // Given
      const newUser = new User();
      newUser.email = 'new';
      newUser.password = 'new';

      const expectedResult = new AccessTokenDto(mockAccessToken);

      // When
      const result = await authService.signUp(newUser);

      // Then
      expect(result).toBeInstanceOf(AccessTokenDto);
      expect(result).toEqual(expectedResult);
    });

    it('FAILURE: 이미 가입되어 있는 유저라면 409 예외 throw', async () => {
      // Given
      const alreadyUser = new User();
      alreadyUser.email = 'already';
      alreadyUser.password = 'already';

      // When & Then
      await expect(async () => {
        await authService.signUp(alreadyUser);
      }).rejects.toThrowError(new ConflictException('이미 가입된 회원입니다.'));
    });
  });

  describe('signIn()', () => {
    // 공통으로 사용되는 객체
    const mockPayload = { sub: 1 };
    const mockAccessToken = `token_${mockPayload.sub}`;

    it('SUCCESS: 올바른 이메일과 패스워드 입력 시 엑세스 토큰 반환', async () => {
      // Given
      const alreadyUser = new User();
      alreadyUser.email = 'already';
      alreadyUser.password = 'already';

      const expectedResult = new AccessTokenDto(mockAccessToken);

      // When
      const result = await authService.signIn(alreadyUser);

      // Then
      expect(result).toBeInstanceOf(AccessTokenDto);
      expect(result).toEqual(expectedResult);
    });

    it('FAILURE: 가입된 이메일이 아닐 때, 401 예외 throw', async () => {
      // Given
      const newUser = new User();
      newUser.email = 'new';
      newUser.password = 'new';

      // When & Then
      await expect(async () => {
        await authService.signIn(newUser);
      }).rejects.toThrowError(
        new UnauthorizedException(
          '로그인에 실패했습니다. 이메일과 비밀번호를 다시 입력해주세요.',
        ),
      );
    });

    it('FAILURE: 패스워드가 틀렸을 때, 401 예외 throw', async () => {
      // Given
      const wrongPasswordUser = new User();
      wrongPasswordUser.email = 'already';
      wrongPasswordUser.password = 'wrong';

      // When & Then
      await expect(async () => {
        await authService.signIn(wrongPasswordUser);
      }).rejects.toThrowError(
        new UnauthorizedException(
          '로그인에 실패했습니다. 이메일과 비밀번호를 다시 입력해주세요.',
        ),
      );
    });
  });

  describe('getTokenPayload()', () => {
    it('SUCCESS: 엑세스 토큰의 페이로드에 있는 sub 클레임이 회원의 id인 경우 페이로드 리턴', async () => {
      // Given
      const requestUser = new User();
      requestUser.email = 'already';
      const savedUser = await userRepository.findUserBy(requestUser);

      const mockAccessToken = `token_${savedUser.id}`;
      const expectedResult: JwtPayload = { sub: savedUser.id };

      // When
      const result = await authService.getTokenPayload(mockAccessToken);

      // Then
      expect(result).toEqual(expectedResult);
    });

    it('FAILURE: 엑세스 토큰의 페이로드에 있는 유저 id가 회원이 아닌 경우 에러 throw', async () => {
      // Given
      const weirdUser = User.byId(22222);
      const weirdAccessToken = `token_${weirdUser.id}`;

      // When & Then
      await expect(async () => {
        await authService.getTokenPayload(weirdAccessToken);
      }).rejects.toThrowError(new Error('존재하지 않는 유저입니다.'));
    });
  });
});
