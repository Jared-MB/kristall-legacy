import { Injectable } from '@nestjs/common';

interface Options {
  onSuccess: {
    message: string;
    status?: number;
  };
  onError?: {
    status?: number;
  };
  ignoreDefaultMessageOnError?: boolean;
}

@Injectable()
export class Adapter {
  public async manage(
    response: any,
    { onSuccess, onError, ignoreDefaultMessageOnError }: Options,
  ) {
    try {
      return {
        message: onSuccess.message,
        status: onSuccess.status || 200,
        data: response,
      };
    } catch (error: unknown) {
      let errorMsg = 'Internal server error';
      if (error instanceof Error && !ignoreDefaultMessageOnError) {
        errorMsg = error.message;
      }
      return {
        status: onError?.status ?? 500,
        message: errorMsg,
      };
    }
  }
}
