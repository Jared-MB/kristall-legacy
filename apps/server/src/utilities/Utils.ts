import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { randomUUID } from 'node:crypto';
import { ServerError } from './Errors';

interface Options {
  message?: string;
  status?: number;
  onErrorMessage?: string;
}

type ErrorOptions = Omit<Options, 'onErrorMessage'>;

/**
 * @deprecated
 */
@Injectable()
export class Utils {
  constructor(private readonly jwtService: JwtService) { }

  /**
   * Adapt Response
   * 
   * @deprecated
   *
   * @description This method is used to adapt the response of the service to the client.
   *
   * @param { Promise<T> } service The service that will be called.
   * @param { Response } res The response object from the controller.
   * @param { Options } options The options object that will be used to customize the response.
   * @returns
   */
  public async adaptResponse<T>(
    service: Promise<T>,
    res: Response,
    options?: Options,
  ) {
    try {
      const response = await service;
      return res.status(options?.status ?? 200).json({
        message: options?.message ?? 'Success',
        data: response,
        status: options?.status ?? 200,
      });
    } catch (err) {
      if (err instanceof ServerError) {
        return res.status(err.status).json(err.getAll());
      }
      return res.status(options?.status ?? 500).json({
        message: options?.onErrorMessage ?? 'Error',
        status: options?.status ?? 500,
      });
    }
  }

  /**
   * Throw Error
   *
   * @description This method is used to throw an error and conserve the response contract that we use.
   *
   * @param { Response } res The response object from the controller.
   * @param { Options } options The options object that will be used to customize the response.
   * @returns
   */
  public async throwError(res: Response, options?: ErrorOptions) {
    return res.status(options?.status ?? 500).json({
      message: options?.message ?? 'Error',
      status: options?.status ?? 500,
    });
  }

  public throwServiceError({ message, status }: ErrorOptions) {
    return {
      message,
      status,
    };
  }

  /**
   * Verify Token
   *
   * @description This method is used to verify the token that is sent in the request.
   *
   * @param { string } token The token that is sent in the request.
   * @param { string } shopID The shop id that is supposed to be in the token.
   * @returns
   */
  public async verifyToken(token: string, shopID: string) {
    const decodedToken = this.jwtService.decode(token.split(' ')[1]);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Missing or invalid token');
    }
    if (decodedToken.shop._id !== shopID) {
      throw new Error('Unauthorized');
    }
    return decodedToken;
  }

  public async generateUUID() {
    return randomUUID();
  }

  // The result must be '111 - 111 - 111 - 1111'
  public divideAccountNumber(clabe: string) {
    // get the last 4 digits
    // const lastFourDigits = clabe.slice(-4);
    // // remove the last 4 digits from the account number
    // const accountNumberWithoutLastFourDigits = clabe.slice(0, -4);
    // split the account number into groups of 3
    const accountNumberGroups = clabe.match(
      /\d{3}/g,
    );
    // join the groups with a dash
    if (!accountNumberGroups) {
      return clabe;
    }
    const accountNumberWithDashes = accountNumberGroups.join(' ');
    // return the account number with the last 4 digits
    // return `${accountNumberWithDashes} ${lastFourDigits}`;
    return accountNumberWithDashes;
  }
}
