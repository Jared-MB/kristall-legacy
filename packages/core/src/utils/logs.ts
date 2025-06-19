import chalk from "chalk";

const kristallColor = chalk.hex("#a855f7");

const kristallLog = chalk.bold(kristallColor("[KRISTALL]"))

export const log = (message: string, ...args: any[]) => {

}

export const errorLog = (message: string, ...args: any[]) => {
    const red = chalk.hex("#ff2056")

    console.log(kristallLog + red("[ERROR] ", message, ...args))
}