import { IsString } from 'class-validator'

export class CreateClientDto {
    @IsString({ message: 'El nombre es requerido' })
    name: string
}