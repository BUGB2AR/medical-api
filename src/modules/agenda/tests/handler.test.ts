import { APIGatewayProxyEvent } from 'aws-lambda';

const handlerModule = require('@/modules/agenda/controllers/getAgendas');
const handler = handlerModule.handler;

jest.mock('@/core/container', () => {
  const { agendamentoMock } = jest.requireActual('@/modules/agendamento/mocks/agendamento.mock');
  return {
    container: {
      resolve: jest.fn().mockReturnValue({
        getAgendas: jest.fn().mockResolvedValue([agendamentoMock, { ...agendamentoMock}]),
      }),
    },
  };
});

const createTestEvent = (): APIGatewayProxyEvent => ({
  body: null,
  headers: {},
  httpMethod: 'GET',
  path: '/agendas',
  requestContext: {} as any,
  resource: '',
  multiValueHeaders: {},
  isBase64Encoded: false,
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
});

describe('Handler de Listagem de Agendas', () => {
  it('deve retornar status 200 e lista de agendas', async () => {
    const event = createTestEvent();

    const response = await handler(event);

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(2);
  });
});
