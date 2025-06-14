import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAgendamentoDto {
  @IsString()
  @IsNotEmpty()
  medico: string;

  @IsString()
  @IsNotEmpty()
  paciente: string;

  @IsString()
  @IsNotEmpty()
  data_horario: string;

  constructor() {
    this.medico = '';
    this.paciente = '';
    this.data_horario = '';
  }
}