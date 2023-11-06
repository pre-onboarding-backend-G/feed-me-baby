import { User } from '../../user/entity/user.entity';
import { SignUpDto } from './sign-up.dto';

describe('SignUpDto', () => {
  describe('toEntity()', () => {
    it('SUCCESS: Request Body에 올바른 값이 전달되었을 때 그 필드들을 가진 user 엔티티 리턴', () => {
      // Given
      const signUpDto = new SignUpDto();
      signUpDto.email = 'feed-me-admin1@naver.com';
      signUpDto.password = 'Feed-me1!';
      signUpDto.city = '서울특별시';
      signUpDto.isRecommendateLunch = true;

      // When
      const expectedResult = signUpDto.toEntity();

      // Then
      expect(expectedResult).toBeInstanceOf(User);
      expect(expectedResult.email).toBe<string>(signUpDto.email);
      expect(expectedResult.password).toBe<string>(signUpDto.password);
      expect(expectedResult.city).toBe<string>(signUpDto.city);
      expect(expectedResult.isRecommendateLunch).toBe<boolean>(
        signUpDto.isRecommendateLunch,
      );
    });
  });
});
