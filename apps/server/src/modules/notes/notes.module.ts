import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    Cancellation,
    LocationProduct,
    Note,
    Payment,
    Product,
    ProductOrder,
} from 'src/entities';
import { AuthService, PaymentService } from 'src/services';
import { TokenService, Utils } from 'src/utilities';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './services/notes.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Note,
            Payment,
            ProductOrder,
            LocationProduct,
            Product,
            Cancellation
        ]),
    ],
    controllers: [NotesController],
    providers: [NotesService, Utils, TokenService, AuthService, PaymentService],
})
export class NotesModule { }