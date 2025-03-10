import { Cookies } from "@/server/decorators/cookie.decorator";
import { AuthService } from "@/server/services";
import {
	Body,
	Controller,
	Get,
	Put,
	UnauthorizedException,
	UseInterceptors
} from "@nestjs/common";
import type { CreateVirtualShowroomClientDto } from "../dtos";
import { VirtualShowroomService } from "../services/virtual-showroom.service";

import { ShopService } from "@/server/modules/shops/services";
import { ResponseInterceptor } from "src/interceptors";
import { VercelService } from "src/modules/vercel/services/vercel.service";

@UseInterceptors(ResponseInterceptor)
@Controller("virtual-showroom")
export class VirtualShowroomController {
	constructor(
		private readonly authService: AuthService,
		private readonly virtualShowroomService: VirtualShowroomService,
		private readonly shopService: ShopService,
		private readonly vercelService: VercelService
	) {}

	@Get()
	async getVirtualShowroom(@Cookies("session") session: string) {
		const user = this.authService.decodeCookie(session);
		if (!user) {
			throw new UnauthorizedException();
		}
		
		const data = await this.virtualShowroomService.get(user.shop._id);
		return data?.publicPage
	}

	@Put("toggle")
	async enableVirtualShowroom(
		@Cookies("session") session: string,
		@Body() body: CreateVirtualShowroomClientDto,
	) {
		const user = this.authService.decodeCookie(session);
		if (!user) {
			throw new UnauthorizedException();
		}

		const hasVirtualShowroom =
			await this.virtualShowroomService.hasVirtualShowroom(user.shop._id);
		if (!hasVirtualShowroom) {
			const url = await this.virtualShowroomService.createUrl(user.shop.name);

			if (!url){
				return {
					status: 400,
					message: "Invalid shop name"
				}
			}

			const domain = await this.vercelService.assignDomainToVS(url);

			if (!domain){
				return {
					status: 400,
					message: "Invalid shop name"
				}
			}

			const virtualShowroom = await this.virtualShowroomService.createAndSave({
				isPublic: true,
				shopId: user.shop._id,
				url,
			});
			return await this.shopService.connectVirtualShowroom(
				user.shop._id,
				virtualShowroom._id,
			);
		}

		await this.virtualShowroomService.toggle(
			body.isPublic,
			hasVirtualShowroom,
		);

		return true
	}
}
