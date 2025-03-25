import { FastifyInstance, FastifyRequest } from 'fastify';
import { AlertaEmergenciaService } from '../services/alertEmergency.service'
import { CreateAlertaEmergenciaDTO } from '../interfaces/alertEmergency.dto';

export async function alertaEmergenciaRoutes(app: FastifyInstance) {
  const service = new AlertaEmergenciaService();

  app.post('/', async (request: FastifyRequest<{ Body: CreateAlertaEmergenciaDTO }>, reply) => {
    try {
      const alerta = await service.criarAlerta(request.body);
      return reply.status(201).send(alerta);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao criar alerta de emergência' });
    }
  });

  app.get('/', async (_, reply) => {
    try {
      const alertas = await service.listarAlertas();
      return reply.send(alertas);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao listar alertas de emergência' });
    }
  });

  app.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const alerta = await service.buscarPorId(request.params.id);
      if (!alerta) {
        return reply.status(404).send({ error: 'Alerta não encontrado' });
      }
      return reply.send(alerta);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar alerta de emergência' });
    }
  });

  app.get('/usuario/:usuarioId', async (request: FastifyRequest<{ Params: { usuarioId: string } }>, reply) => {
    try {
      const alertas = await service.buscarPorUsuario(request.params.usuarioId);
      return reply.send(alertas);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar alertas por usuário' });
    }
  });

  app.put('/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<CreateAlertaEmergenciaDTO> }>, reply) => {
    try {
      const alerta = await service.atualizarAlerta(request.params.id, request.body);
      return reply.send(alerta);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao atualizar alerta de emergência' });
    }
  });

  app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      await service.removerAlerta(request.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao remover alerta de emergência' });
    }
  });
}
