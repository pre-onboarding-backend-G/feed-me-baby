import { UpdateUserDto } from './update-user.dto';

describe('UpdateUserDto', () => {
  describe('toEntity()', () => {
    it('SUCCESS: Request Body에 올바른 값이 전달되었을 때 그 필드들을 가진 user 엔티티 리턴', () => {
      // Given
      const updateUserDto = new UpdateUserDto();
      updateUserDto.lat = 37.566295;
      updateUserDto.lon = 126.977945;
      updateUserDto.isRecommendateLunch = true;

      // When
      const expectedResult = updateUserDto.getProps();

      // Then
      expect(expectedResult.lat).toBe<number>(updateUserDto.lat);
      expect(expectedResult.lon).toBe<number>(updateUserDto.lon);
      expect(expectedResult.isRecommendateLunch).toBe<boolean>(
        updateUserDto.isRecommendateLunch,
      );
    });
  });
});
