import { APIGatewayProxyResult } from 'aws-lambda';

export const httpResponse = {
  success: (body: unknown): APIGatewayProxyResult => ({
    statusCode: 200,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  created: (body: unknown): APIGatewayProxyResult => ({
    statusCode: 201,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  badRequest: (body: { message: string } | string): APIGatewayProxyResult => ({
    statusCode: 400,
    body: typeof body === 'string' ? JSON.stringify({ message: body }) : JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  notFound: (body: { message: string } | string): APIGatewayProxyResult => ({
    statusCode: 404,
    body: typeof body === 'string' ? JSON.stringify({ message: body }) : JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  serverError: (body: { message: string } | string): APIGatewayProxyResult => ({
    statusCode: 500,
    body: typeof body === 'string' ? JSON.stringify({ message: body }) : JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
};