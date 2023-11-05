import { User } from '../../user/entity/user.entity';
import { SignUpReqDto } from './sign-up-req.dto';

describe('sign-up-req.dto.ts', () => {
  describe('SignUpReqDto', () => {
    describe('toEntity', () => {
      it('SUCCESS: Request Body에 올바른 값이 전달되었을 때 그 필드들을 가진 user 엔티티 리턴', () => {
        // When
        const signUpReqDto = new SignUpReqDto();
        signUpReqDto.email = 'feed-me-admin1@naver.com';
        signUpReqDto.password = 'Feed-me1!';
        signUpReqDto.city = '서울특별시';
        signUpReqDto.isRecommendateLunch = true;

        // When
        const expectedResult = signUpReqDto.toEntity();

        // Then
        expect(expectedResult).toBeInstanceOf(User);
        expect(expectedResult.email).toBe<string>(signUpReqDto.email);
        expect(expectedResult.password).toBe<string>(signUpReqDto.password);
        expect(expectedResult.city).toBe<string>(signUpReqDto.city);
        expect(expectedResult.isRecommendateLunch).toBe<boolean>(
          signUpReqDto.isRecommendateLunch,
        );
      });
    });
  });
});
