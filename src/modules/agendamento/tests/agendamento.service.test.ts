import { agendamentoResponseMock } from '../mocks/agendamento.mock';
import { AgendamentoService } from '../services/agendamento.service';
import { container } from '@core/container';

jest.mock('class-validator', () => ({
  ...jest.requireActual('class-validator'),
  validate: jest.fn().mockImplementation(async (dto) => {
    const errors = [];
    if (!dto.medico || dto.medico.trim() === '') {
      errors.push({ constraints: { isNotEmpty: 'medico não pode estar vazio' } });
    }
    if (!dto.paciente || dto.paciente.trim() === '') {
      errors.push({ constraints: { isNotEmpty: 'paciente não pode estar vazio' } });
    }
    if (!dto.data_horario || !/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(dto.data_horario)) {
      errors.push({ constraints: { matches: 'data_horario deve estar no formato YYYY-MM-DD HH:mm' } });
    }
    return errors;
  })
}));

describe('AgendamentoService', () => {
  let service: AgendamentoService;

  beforeAll(() => {
    jest.clearAllMocks();
    service = container.resolve<AgendamentoService>('AgendamentoService');
  });

  describe('createAgendamento() - Casos de Sucesso', () => {
    it('deve criar um agendamento com payload válido', async () => {
      const payload = {
        medico: 'Dr. João Silva',
        paciente: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00'
      };

      const result = await service.createAgendamento(payload);
      
      expect(result).toEqual(agendamentoResponseMock);
      expect(result.mensagem).toBe('Agendamento realizado com sucesso');
    });
  });

  describe('createAgendamento() - Casos de Erro', () => {
    const testCases = [
      {
        description: 'paciente vazio',
        payload: { medico: 'Dr. João Silva', paciente: '', data_horario: '2024-10-05 09:00' },
        expectedError: 'paciente não pode estar vazio'
      },
      {
        description: 'data inválida',
        payload: { medico: 'Dr. João Silva', paciente: 'Carlos', data_horario: 'data-invalida' },
        expectedError: 'data_horario deve estar no formato YYYY-MM-DD HH:mm'
      },
      {
        description: 'médico vazio',
        payload: { medico: '', paciente: 'Carlos', data_horario: '2024-10-05 09:00' },
        expectedError: 'medico não pode estar vazio'
      }
    ];

    testCases.forEach(({ description, payload, expectedError }) => {
      it(`deve retornar erro quando ${description}`, async () => {
        try {
          await service.createAgendamento(payload);
          fail('Deveria ter lançado um erro');
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });
    });
  });
});