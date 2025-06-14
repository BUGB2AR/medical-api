import { Injectable } from '@/core/decorators/injectable';
import { AgendaResponse } from '../interfaces/medico.interface';
import { medicosMock } from '../mocks/medicos.mock';

@Injectable()
export class AgendaService {
  public async getAgendas(): Promise<AgendaResponse> {
    return {
      medicos: medicosMock,
    };
  }
}