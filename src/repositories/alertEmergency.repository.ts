import { prisma } from "../database/prisma-client";
import { CreateAlertaEmergenciaDTO } from '../interfaces/alertEmergency.dto';

export class AlertaEmergenciaRepository {
  async create(data: CreateAlertaEmergenciaDTO) {
    return prisma.alertaEmergencia.create({ data });
  }

  async findAll() {
    return prisma.alertaEmergencia.findMany();
  }

  async findById(id: string) {
    return prisma.alertaEmergencia.findUnique({ where: { id } });
  }

  async findByUsuario(usuarioId: string) {
    return prisma.alertaEmergencia.findMany({ where: { usuarioId } });
  }

  async update(id: string, data: Partial<CreateAlertaEmergenciaDTO>) {
    return prisma.alertaEmergencia.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.alertaEmergencia.delete({ where: { id } });
  }
}
