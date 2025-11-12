import type { NexumConfig } from "@kristall/nexum/config";
import "dotenv/config";

const config: NexumConfig = {
  serverUrl: process.env.SERVER_API,
  sessionCookieName: "session",
};

export default config;
