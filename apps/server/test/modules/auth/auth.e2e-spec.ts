import { AppModule } from "@kristall/server/src/app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import cookieParser from "cookie-parser";
import * as request from "supertest";

describe('Auth Controller (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleRef.createNestApplication()
        app.use(cookieParser());
        app.setGlobalPrefix("api");
        await app.init()
    })

    it('Health (GET)', () => {
        return request(app.getHttpServer())
            .get('/api/health-check')
            .expect(200)
    })
})