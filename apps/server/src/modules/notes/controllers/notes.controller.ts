import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    Headers,
    Param,
    Post,
    Put,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Cookies } from 'src/decorators';
import { Cancellation } from 'src/entities';
import { ResponseInterceptor } from 'src/interceptors';
import { AuthService, PaymentService } from 'src/services';
import { TokenService, Utils } from 'src/utilities';
import { NotesService } from '../services/notes.service';

@Controller('notes')
export class NotesController {
    constructor(
        private readonly utils: Utils,
        private readonly notesService: NotesService,
        private readonly tokenService: TokenService,
        private readonly authService: AuthService,
        private readonly paymentService: PaymentService,
    ) { }

    @UseInterceptors(new ResponseInterceptor())
    @Post()
    async addNote(
        @Cookies('session') session: string,
    ) {
        const user = this.authService.decodeCookie(session);
        if (!user) {
            throw new ForbiddenException()
        }
        // const note = this.notesService.addNote(body);
        // return this.utils.adaptResponse(note, res);
    }

    @Get('shop/:id')
    async getAllNotesByShopId(
        @Res() res: Response,
        @Headers() headers: { authorization: string },
        @Param() params: { id: string },
    ) {
        const token = headers.authorization;
        const notes = this.notesService.getAllNotesByShopId(params.id, token);
        return this.utils.adaptResponse(notes, res);
    }

    @Put('cancel')
    async cancelNote(
        @Body() body: Omit<Cancellation, 'date' | '_id'>,
        @Headers() headers: { authorization: string },
        @Res() res: Response,
    ) {
        const shop = this.tokenService.getShop(headers.authorization);
        if (!shop) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const note = this.notesService.cancelNote(body, shop._id);
        return this.utils.adaptResponse(note, res);
    }
}
