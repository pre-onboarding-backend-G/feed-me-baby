import { UpdateUserDto } from './update-user.dto';
import { User } from '../entity/user.entity';

describe('UpdateUserDto', () => {
  describe('toEntity()', () => {
    it('SUCCESS: Request Body에 올바른 값이 전달되었을 때 그 필드들을 가진 user 엔티티 리턴', () => {
      // Given
      const updateUserDto = new UpdateUserDto();
      updateUserDto.latitude = 37.566295;
      updateUserDto.longitude = 126.977945;
      updateUserDto.isRecommendateLunch = true;

      // When
      const expectedResult = updateUserDto.toEntity();

      // Then
      expect(expectedResult).toBeInstanceOf(User);
      expect(expectedResult.latitude).toBe<number>(updateUserDto.latitude);
      expect(expectedResult.longitude).toBe<number>(updateUserDto.longitude);
      expect(expectedResult.isRecommendateLunch).toBe<boolean>(
        updateUserDto.isRecommendateLunch,
      );
    });
  });
});
