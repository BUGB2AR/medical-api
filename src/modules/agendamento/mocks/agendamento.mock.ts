import { Agendamento } from '../interfaces/agendamento.interface';

export const agendamento: Agendamento = {
  medico: 'Dr. João Silva',
  paciente: 'Carlos Almeida',
  data_horario: '2024-10-05 09:00'
};

export const agendamentoResponseMock = {
  mensagem: 'Agendamento realizado com sucesso',
  agendamento: agendamento
};