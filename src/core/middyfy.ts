import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from './exceptions/bad-request.exception';
import type { ClassConstructor } from 'class-transformer/types/interfaces';

import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpJsonBodyParser from '@middy/http-json-body-parser';

interface MiddyfyOptions<T extends object = object> {
  bodySchema?: ClassConstructor<T>;
}

export const middyfy = <T extends object = object>(
  handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>,
  options?: MiddyfyOptions<T>,
) => {
  const middyfiedHandler = middy(handler)
    .use(httpJsonBodyParser())
    .use(httpErrorHandler());

  if (options?.bodySchema) {
    const schema = options.bodySchema;

    middyfiedHandler.use({
      before: async (request: { event: { body?: unknown } }) => {
        if (request.event.body) {
          const instance = plainToInstance(schema, request.event.body);

          if (typeof instance === 'object' && instance !== null) {
            const errors = await validate(instance);

            if (errors.length > 0) {
              const message = errors
                .map(error => Object.values(error.constraints || {}))
                .join(', ');
              throw new BadRequestException(message);
            }

            request.event.body = instance;
          } else {
            throw new BadRequestException('Invalid request body format');
          }
        }
      },
    });
  }

  return middyfiedHandler;
};
