import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength, maxLength, minLength } from "class-validator";

export class CreateReviewDto {
	@IsNotEmpty()
	@IsInt()
	restaurantId: number;

	@IsNotEmpty()
	@IsInt()
	@Min(0)
	@Max(5)
	score: number;

	@IsString()
	// @MinLength(0)
	@MaxLength(255)
	content: string;
}
