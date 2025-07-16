import chalk from "chalk";

export class KristallLogger {
	private readonly KRISTALL_COLOR = chalk.hex("#a855f7");
	private readonly KRISTALL_LOGO = this.KRISTALL_COLOR("[KRISTALL] ");

	private RED_LOG = chalk.red;
	private YELLOW_LOG = chalk.yellow;

	public log(message: string, ...args: any[]) {
		console.log(this.KRISTALL_LOGO + message, ...args);
	}

	public error(message: string, ...args: any[]) {
		console.error(this.KRISTALL_LOGO + this.RED_LOG(message, ...args));
	}

	public warn(message: string, ...args: any[]) {
		console.warn(this.KRISTALL_LOGO + this.YELLOW_LOG(message, ...args));
	}
}

export const logger = new KristallLogger();
