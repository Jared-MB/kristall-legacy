import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    Cancellation,
    LocationProduct,
    Note,
    Payment,
    Product,
    ProductOrder,
} from '@/server/entities';
import { AuthService, PaymentService } from '@/server/services';
import { TokenService, Utils } from '@/server/utilities';
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