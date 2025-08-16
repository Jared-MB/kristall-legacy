import { IsNumber, IsUUID } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
    @IsUUID()
    _id: string;

    @IsNumber()
    isActive: number;
}
