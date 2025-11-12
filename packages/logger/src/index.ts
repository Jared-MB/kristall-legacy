import chalk from "chalk";
// import { pino, type Logger } from "pino";

// const pinoLogger: Logger = pino({
//   transport: {
//     target: "pino-pretty",
//     options: {
//       colorize: true,
//     },
//   },
//   level: process.env.PINO_LOG_LEVEL || "info",

//   redact: [],
// });

export class KristallLogger {
  private readonly KRISTALL_COLOR = chalk.hex("#a855f7");
  private readonly KRISTALL_LOGO = this.KRISTALL_COLOR("[KRISTALL] ");

  private RED_LOG = chalk.red;
  private YELLOW_LOG = chalk.yellow;

  private formatMessage(message: any): string {
    if (typeof message === "object") {
      return JSON.stringify(message, null, 2);
    }

    return message;
  }

  public log(message: any, ...args: any[]) {
    console.log(this.KRISTALL_LOGO + this.formatMessage(message), ...args);
  }

  public error(message: any, ...args: any[]) {
    console.error(
      this.KRISTALL_LOGO + this.RED_LOG(this.formatMessage(message)),
      ...args
    );
  }

  public warn(message: any, ...args: any[]) {
    console.warn(
      this.KRISTALL_LOGO + this.YELLOW_LOG(this.formatMessage(message)),
      ...args
    );
  }
}

export const logger = new KristallLogger();
