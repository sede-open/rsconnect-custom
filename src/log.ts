import { Console } from "console"

function buildLog(): Console {
    // TODO: fs.createWriteStream to somewhere in ~/.cache/ ?
    return new Console(
        process.stdout,
        process.stderr
    )
}

export const log = buildLog()