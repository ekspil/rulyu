import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      response.status(status).json({
        success: false,
        result: {
          error: exception.message || 'Internal server error',
        },
      });
    } else {
      response.status(500).json({
        success: false,
        result: {
          error: 'Internal server error',
        },
      });
    }
  }
}
