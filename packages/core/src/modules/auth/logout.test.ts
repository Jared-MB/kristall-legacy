import { deleteCookie } from "@kristall/core/utils/cookies";
import { redirect } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AUTH_COOKIE } from "./constants/auth.constant";
import { logout } from "./logout";

vi.mock("@kristall/core/utils/cookies");
vi.mock("next/navigation");

describe("logout", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should delete the auth cookie and redirect to login", async () => {
		await logout();

		expect(deleteCookie).toHaveBeenCalledWith(AUTH_COOKIE);
		expect(redirect).toHaveBeenCalledWith("/login");
	});
});
