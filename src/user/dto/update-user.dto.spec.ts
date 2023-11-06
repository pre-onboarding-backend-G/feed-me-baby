import { User } from '../entity/user.entity';
import { UpdateUserDto } from './update-user.dto';

describe('sign-up-req.dto.ts', () => {
  describe('UpdateUserReqDto', () => {
    describe('toEntity', () => {
      it('SUCCESS: Request Body에 올바른 값이 전달되었을 때 그 필드들을 가진 user 엔티티 리턴', () => {
        // When
        const updateUserReqDto = new UpdateUserDto();
        updateUserReqDto.latitude = 37.566295;
        updateUserReqDto.longitude = 126.977945;
        updateUserReqDto.isRecommendateLunch = true;

        // When
        const expectedResult = updateUserReqDto.toEntity();

        // Then
        expect(expectedResult).toBeInstanceOf(User);
        expect(expectedResult.latitude).toBe<number>(updateUserReqDto.latitude);
        expect(expectedResult.longitude).toBe<number>(
          updateUserReqDto.longitude,
        );
        expect(expectedResult.isRecommendateLunch).toBe<boolean>(
          updateUserReqDto.isRecommendateLunch,
        );
      });
    });
  });
});
