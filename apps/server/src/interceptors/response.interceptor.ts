import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const serverResponse = context.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(
      map(data => {
        /**
         * THIS WAS LIKE THIS `data['status'] && !isNaN(data['status'])` BUT, SINCE GET SHOP IMAGE RESPONSE IS
         * A STRING, IT WAS NOT WORKING BECAUSE CANT ACCESS THE KEY 'status' IN THE STRING
         * THATS WHY NOW WE CHECK MORE THAN 'NECESSARY' TO CHECK IF THE STATUS IS A NUMBER TO THROW
         * THE ERROR
         */
        if (data && typeof data === 'object' && 'status' in data && data.status && !isNaN(data.status)) {
          const { response } = data;
          return {
            data: null,
            message: response?.message ?? 'Internal server error',
            status: serverResponse ?? response.status ?? 500,
          };
        }
        return {
          message: 'Success',
          data,
          status: serverResponse ?? 200,
        };
      })
    );
  }
}