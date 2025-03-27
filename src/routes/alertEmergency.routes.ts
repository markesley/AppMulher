import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AlertaEmergenciaService } from '../services/alertEmergency.service';
import { CreateAlertaEmergenciaDTO } from '../interfaces/alertEmergency.dto';
import { authMiddleware } from '../middlewares/authMiddleware';

export async function alertaEmergenciaRoutes(app: FastifyInstance) {
  const service = new AlertaEmergenciaService();

  // POST: Criar alerta de emergência
  app.post('/', async (request: FastifyRequest<{ Body: CreateAlertaEmergenciaDTO }>, reply: FastifyReply) => {
    try {
      const alerta = await service.criarAlerta(request.body);
      return reply.status(201).send(alerta);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao criar alerta de emergência' });
    }
  });

  // GET: Listar alertas
  app.get('/', async (_, reply: FastifyReply) => {
    try {
      const alertas = await service.listarAlertas();
      return reply.send(alertas);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao listar alertas de emergência' });
    }
  });

  // GET: Buscar alerta por ID
  app.get('/:id',  async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
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

  // GET: Buscar alertas por usuário
  app.get('/usuario/:usuarioId', async (request: FastifyRequest<{ Params: { usuarioId: string } }>, reply: FastifyReply) => {
    try {
      const alertas = await service.buscarPorUsuario(request.params.usuarioId);
      return reply.send(alertas);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar alertas por usuário' });
    }
  });

  // PUT: Atualizar alerta de emergência
  app.put('/:id',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<CreateAlertaEmergenciaDTO> }>, reply: FastifyReply) => {
    try {
      const alerta = await service.atualizarAlerta(request.params.id, request.body);
      return reply.send(alerta);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao atualizar alerta de emergência' });
    }
  });

  // DELETE: Remover alerta de emergência
  app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      await service.removerAlerta(request.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao remover alerta de emergência' });
    }
  });
}
