import { AlertaEmergenciaRepository } from '../repositories/alertEmergency.repository';
import { CreateAlertaEmergenciaDTO } from '../interfaces/alertEmergency.dto';

export class AlertaEmergenciaService {
  private repository: AlertaEmergenciaRepository;

  constructor() {
    this.repository = new AlertaEmergenciaRepository();
  }

  async criarAlerta(data: CreateAlertaEmergenciaDTO) {
    return this.repository.create(data);
  }

  async listarAlertas() {
    return this.repository.findAll();
  }

  async buscarPorId(id: string) {
    return this.repository.findById(id);
  }

  async buscarPorUsuario(usuarioId: string) {
    return this.repository.findByUsuario(usuarioId);
  }

  async atualizarAlerta(id: string, data: Partial<CreateAlertaEmergenciaDTO>) {
    return this.repository.update(id, data);
  }

  async removerAlerta(id: string) {
    return this.repository.delete(id);
  }
}
