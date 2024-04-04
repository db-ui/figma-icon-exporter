import { log } from "console";

export const getDefaultHeader = (token?: string) => ({
  headers: {
    "Content-Type": "application/json",
    "X-Figma-Token": token,
  },
});

export const debugLog = (debug: boolean, message: unknown) => {
  if (debug) {
    log(message);
  }
};

export class InlineLog {
  private message: unknown | undefined;
  private started: boolean = false;
  private dots: string = "";

  constructor(message?: unknown) {
    this.message = message;
  }

  public setMessage(message?: unknown) {
    process.stdout.write("\n");
    this.dots = "";
    this.message = message;
  }

  public start() {
    this.started = true;
    process.stdout.write("\n");
    this.logInline();
  }

  private logInline = async () => {
    process.stdout.write("\r");
    process.stdout.write(this.message + this.dots);
    await new Promise((res) => setTimeout(res, 500));

    this.dots += ".";

    if (this.started) {
      this.logInline();
    }
  };

  public stop() {
    this.started = false;
    process.stdout.write("\r");
  }
}

export default { getDefaultHeader, debugLog, InlineLog };
