import { Injectable } from '@core/decorators/injectable';
import { CreateAgendamentoDto } from '@modules/agenda/dtos/create-agendamento.dto';
import { AgendamentoResponse } from '../interfaces/agendamento.interface';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AgendamentoService {
  public async createAgendamento(payload: CreateAgendamentoDto): Promise<AgendamentoResponse> {
    const dtoInstance = plainToInstance(CreateAgendamentoDto, payload);
    const errors = await validate(dtoInstance);
    
    if (errors.length > 0) {
      const message = errors
        .map(error => Object.values(error.constraints || {}))
        .join(', ');
      throw new Error(message);
    }

    return {
      mensagem: 'Agendamento realizado com sucesso',
      agendamento: {
        medico: payload.medico,
        paciente: payload.paciente,
        data_horario: payload.data_horario
      }
    };
  }
}