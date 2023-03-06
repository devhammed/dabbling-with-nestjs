import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponseStatus } from './app.response';

export class ValidationException extends HttpException {
  constructor(public readonly errors: ValidationError[]) {
    super('Validation errors.', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    console.log('errors', exception);

    return response.status(status).json({
      status: ApiResponseStatus.ERROR,
      message: exception.message,
      errors: exception.errors.reduce((acc, err) => {
        const messages = Object.values(err.constraints);

        if (messages.length) {
          acc[err.property] = messages[0];
        }

        return acc;
      }, {}),
    });
  }
}

@Catch()
export class CatchAllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    return response.status(status).json({
      status: ApiResponseStatus.ERROR,
      message: exception.message ?? exception.name,
    });
  }
}
