import { AgendaService } from "@/modules/agenda/services/agenda.service";
import { AgendamentoService } from "@/modules/agendamento/services/agendamento.service";

class Container {
  private services: Map<string, any> = new Map();

  constructor() {
    this.registerServices();
  }

  private registerServices(): void {
    this.services.set('AgendaService', new AgendaService());
    this.services.set('AgendamentoService', new AgendamentoService());
  }

  public resolve<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service ${key} not found`);
    }
    return service;
  }
}

export const container = new Container();