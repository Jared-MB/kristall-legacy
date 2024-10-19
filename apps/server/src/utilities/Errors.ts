export class ServerError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  public getAll() {
    return {
      message: this.message,
      status: this.status,
    };
  }
}
