import { checkServices } from "@/app/services";
import { NextResponse } from "next/server";

export async function GET() {
	const services = await checkServices();
	return NextResponse.json(services);
}
