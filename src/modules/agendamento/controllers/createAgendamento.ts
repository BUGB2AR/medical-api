import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AgendamentoService } from '../services/agendamento.service';
import { container } from '@/core/container';
import { httpResponse } from '@/core/httpResponse';
import { middyfy } from '@/core/middyfy';

interface AgendamentoPayload {
  agendamento: {
    medico: string;
    paciente: string;
    data_horario: string;
  };
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const agendamentoService = container.resolve<AgendamentoService>('AgendamentoService');
    
    if (!event.body) {
      return httpResponse.badRequest({ message: 'Request body is required' });
    }

    let payload: AgendamentoPayload;
    try {
      payload = JSON.parse(event.body);
    } catch (e) {
      return httpResponse.badRequest({ message: 'Invalid JSON format' });
    }

    if (!payload.agendamento || 
        !payload.agendamento.medico || 
        !payload.agendamento.paciente || 
        !payload.agendamento.data_horario) {
      return httpResponse.badRequest({ 
        message: 'Payload must follow the format: { agendamento: { medico: string, paciente: string, data_horario: string } }'
      });
    }

    const response = await agendamentoService.createAgendamento({
      medico: payload.agendamento.medico,
      paciente: payload.agendamento.paciente,
      data_horario: payload.agendamento.data_horario
    });

    return httpResponse.success({
      agendamento: response
    });
  } catch (error) {
    console.error('Error creating agendamento:', error);
    return httpResponse.serverError({ 
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const main = middyfy(handler);