import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Callback } from 'aws-lambda';
import { main } from '../controllers/createAgendamento';
import { mockAgendamentoRequest } from '../mocks/mock.agendamento.request';


jest.mock('@/core/middyfy', () => ({
  middyfy: jest.fn().mockImplementation((handler) => {
    return async (event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyResult> => {
      try {
        const result = await handler(event, context, callback);
        return {
          statusCode: result?.statusCode ?? 500,
          body: result?.body ?? JSON.stringify({ message: 'Internal server error' }),
        };
      } catch {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Internal server error' }),
        };
      }
    };
  }),
}));

const createTestEvent = (body: unknown): APIGatewayProxyEvent => ({
  body: body ? JSON.stringify(body) : null,
  headers: {},
  httpMethod: 'POST',
  path: '/agendamento',
  requestContext: {} as any,
  resource: '',
  multiValueHeaders: {},
  isBase64Encoded: false,
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
});

const mockContext: Context = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: '',
  functionVersion: '',
  invokedFunctionArn: '',
  memoryLimitInMB: '',
  awsRequestId: '',
  logGroupName: '',
  logStreamName: '',
  getRemainingTimeInMillis: () => 0,
  done: () => {},
  fail: () => {},
  succeed: () => {},
};

const mockCallback: Callback = jest.fn();


it('deve processar um agendamento válido', async () => {
    const event = createTestEvent(mockAgendamentoRequest);
    const result = await main(event, mockContext, mockCallback);
  
    if (!result) {
      throw new Error('Resultado não deveria ser undefined');
    }
  
    expect(result.statusCode).toBe(200);
    
    const responseBody = JSON.parse(result.body);

    expect(responseBody).toEqual(
        expect.objectContaining({
          agendamento: expect.any(Object)
        })
      );
   
  });