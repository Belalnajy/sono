import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
