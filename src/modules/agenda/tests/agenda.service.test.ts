const { container } = require('@/core/container');
const { AgendaService } = require('../services/agenda.service');

describe('AgendaService', () => {
  let agendaService: typeof AgendaService;

  beforeAll(() => {
    agendaService = container.resolve('AgendaService');
  });

  test('deve retornar uma lista de médicos', async () => {
    const result = await agendaService.getAgendas();
    expect(result).toHaveProperty('medicos');
    expect(Array.isArray(result.medicos)).toBeTruthy();
  });
});