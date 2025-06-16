import chalk from "chalk";
import { HTTP } from "../interfaces/methods";
import { __IS__DEV__ } from "./isDev";

interface RequestLog {
	method: HTTP;
	url: string;
	status: number;
}

const nexumLog = () => {
	const logoColor = chalk.hex("#a855f7");
	const logo = logoColor("[NEXUM] ");

	return logo;
};

export const log = (message: string) => {
	console.log(nexumLog() + message);
};

export const showRequestLog = ({ method, url, status }: RequestLog) => {
	const message = `[${method}] ${url} [${status}]`;

	if (!__IS__DEV__) {
		return;
	}

	if (method === HTTP.GET) {
		console.log(nexumLog() + chalk.blue(message));
		return;
	}
	if (method === HTTP.POST) {
		console.log(nexumLog() + chalk.green(message));
		return;
	}
	if (method === HTTP.PUT) {
		console.log(nexumLog() + chalk.yellow(message));
		return;
	}
	if (method === HTTP.PATCH) {
		console.log(nexumLog() + chalk.magenta(message));
		return;
	}
	if (method === HTTP.DELETE) {
		console.log(nexumLog() + chalk.red(message));
	}
};

export const errorLog = (message: string) => {
	console.error(nexumLog() + chalk.red(message));
};

export const warnLog = (message: string) => {
	console.warn(nexumLog() + chalk.yellow(message));
};
