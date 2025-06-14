import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AgendaService } from '../services/agenda.service';
import { container } from '@/core/container';
import { httpResponse } from '@/core/httpResponse';
import { middyfy } from '@/core/middyfy';

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const agendaService = container.resolve<AgendaService>('AgendaService');
  const response = await agendaService.getAgendas();
  return httpResponse.success(response);
};

module.exports.handler = middyfy(handler);