import { FastifyInstance, FastifyRequest } from 'fastify';
import { GrupoApoioService } from '../services/grupoApoio.service';
import { CreateGrupoApoioDTO } from '../interfaces/group.dto';

export async function grupoApoioRoutes(app: FastifyInstance) {
  const service = new GrupoApoioService();

  app.post('/', async (request: FastifyRequest<{ Body: CreateGrupoApoioDTO }>, reply) => {
    try {
      const grupo = await service.createGrupoApoio(request.body);
      return reply.status(201).send(grupo);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao criar grupo de apoio' });
    }
  });

  app.get('/', async (_, reply) => {
    try {
      const grupos = await service.getAllGruposApoio();
      return reply.send(grupos);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar grupos de apoio' });
    }
  });

  app.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const { id } = request.params;
      const grupo = await service.getGrupoApoioById(id);
      if (!grupo) {
        return reply.status(404).send({ error: 'Grupo de apoio não encontrado' });
      }
      return reply.send(grupo);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar grupo de apoio' });
    }
  });

  app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const { id } = request.params;
      await service.deleteGrupoApoio(id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao deletar grupo de apoio' });
    }
  });
}
