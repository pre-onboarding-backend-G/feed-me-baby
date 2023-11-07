import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { User } from './entity/user.entity';
import { GetUserResDto } from './dto/get-user-res.dto';
import { NotFoundException } from '@nestjs/common';

// DB 의존성 Mock
class MockUserRepository {
  findUserBy = jest.fn();
  updateUser = jest.fn();
}

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useClass: MockUserRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);

    // UserRepository Stub
    jest
      .spyOn(userRepository, 'findUserBy')
      .mockImplementation((user: User) => {
        if (user.id === 1) {
          const savedUser = new User();
          savedUser.id = 1;
          savedUser.email = 'already';
          savedUser.password = 'already hashed 10';
          return Promise.resolve(savedUser);
        } else if (user.id > 1) {
          return Promise.resolve(null);
        }
      });

    jest
      .spyOn(userRepository, 'updateUser')
      .mockImplementation((userId: number) => {
        if (userId === 1) {
          return Promise.resolve(true);
        } else if (userId > 1) {
          return Promise.resolve(false);
        }
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('getUser()', () => {
    it('SUCCESS: 유저 id가 db에 존재하면 DB의 유저 정보를 DTO에 담아 리턴', async () => {
      // Given
      const alreadyUserId = 1;
      const userInDb = await userRepository.findUserBy(
        User.byId(alreadyUserId),
      );
      console.log('userInDb: ', userInDb);
      const expectedResult = new GetUserResDto(userInDb);

      // When
      const result = await userService.getUser(alreadyUserId);

      // Then
      expect(result).toEqual(expectedResult);
    });

    it('FAILURE: 유저가 존재하지 않으면 404 에러 Throw', async () => {
      // Given
      const notUserId = 22222;

      // When & Then
      expect(async () => {
        await userService.getUser(notUserId);
      }).rejects.toThrowError(
        new NotFoundException('유저가 존재하지 않습니다.'),
      );
    });
  });

  describe('updateUser()', () => {
    const userUpdateProps = {
      latitude: 37.6,
      longitude: 126.24,
      isRecommendateLunch: true,
    };

    it('SUCCESS: 유저 id가 db에 존재하면 전달 받은 정보로 DB 업데이트(void)', async () => {
      // Given
      const alreadyUserId = 1;

      // When
      const result = await userService.updateUser(
        alreadyUserId,
        userUpdateProps,
      );

      // Then
      expect(result).toBe('사용자 정보 업데이트 성공');
    });

    it('FAILURE: 유저가 존재하지 않으면 404 에러 Throw', async () => {
      // Given
      const notUserId = 22222;

      // When & Then
      expect(async () => {
        await userService.updateUser(notUserId, userUpdateProps);
      }).rejects.toThrowError(
        new NotFoundException('유저가 존재하지 않습니다.'),
      );
    });
  });
});
