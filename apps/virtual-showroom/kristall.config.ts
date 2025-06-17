import type { KristallConfig } from "@kristall/http/interfaces";

const dotenv = require("dotenv");
dotenv.config();

const config: KristallConfig = {
	serverUrl: process.env.SERVER_URL,
	defaultAuthRequests: false,
};

export default config;
