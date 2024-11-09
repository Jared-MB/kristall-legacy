import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

import { NestExpressApplication } from "@nestjs/platform-express";
import 'dotenv/config';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		rawBody: true,
	});

	app.disable('x-powered-by');

	app.enableCors({
		origin: (origin, callback) => {

			const ACCEPTED_DEV_ORIGINS = [
				'http://localhost:3002',
				'http://localhost:3000',
				'http://localhost:3003',
			]

			const ACCEPTED_ORIGINS = [
				'https://kristall.app',
				'https://www.kristall.app',
				'https://pos.kristall.app',
				'https://dashboard.kristall.app',
				'https://status.kristall.app'
			]

			let ALL_ACCEPTED_ORIGINS = [...ACCEPTED_ORIGINS]
			if (process.env.NODE_ENV !== 'production') {
				ALL_ACCEPTED_ORIGINS = [...ACCEPTED_DEV_ORIGINS, ...ACCEPTED_ORIGINS]
			}

			if (ALL_ACCEPTED_ORIGINS.includes(origin) || !origin) {
				return callback(null, true)
			}

			return callback(new Error('Not allowed by CORS'))
		},
	});
	app.use(cookieParser());
	app.setGlobalPrefix("api");

	if (process.env.NODE_ENV !== "production") {
		const config = new DocumentBuilder()
			.setTitle('Kristall API')
			.setDescription('The Kristall API description')
			.setVersion('1.0')
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('docs/api', app, document);
	}

	console.log(process.env)

	await app.listen(process.env.PORT || 3001);
}
bootstrap();

