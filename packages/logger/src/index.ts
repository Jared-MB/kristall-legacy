import chalk from "chalk";
import pino from "pino";
import pinoPretty from "pino-pretty";

const stream = pinoPretty({
  colorize: true,
});

const pinoLogger = pino(stream);

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
    pinoLogger.info(this.KRISTALL_LOGO + this.formatMessage(message), ...args);
  }

  public error(message: any, ...args: any[]) {
    pinoLogger.error(
      this.KRISTALL_LOGO + this.RED_LOG(this.formatMessage(message)),
      ...args
    );
  }

  public warn(message: any, ...args: any[]) {
    pinoLogger.warn(
      this.KRISTALL_LOGO + this.YELLOW_LOG(this.formatMessage(message)),
      ...args
    );
  }
}

export const logger = new KristallLogger();
