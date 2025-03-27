import { FastifyInstance } from 'fastify';
import { ComentarioService } from '../services/comment.service'
import { CreateComentarioDTO } from '../interfaces/comment.dto';
import { authMiddleware } from '../middlewares/authMiddleware';

export async function comentarioRoutes(fastify: FastifyInstance) {
  const comentarioService = new ComentarioService();

  // Criar comentário
  fastify.post<{ Body: CreateComentarioDTO }>('/',{ preHandler: authMiddleware }, async (req, reply) => {
    try {
      const comentario = await comentarioService.createComentario(req.body);
      return reply.code(201).send(comentario);
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
      return reply.code(500).send({ error: 'Erro ao criar comentário' });
    }
  });

  // Listar todos os comentários
  fastify.get('/',{ preHandler: authMiddleware }, async (_, reply) => {
    try {
      const comentarios = await comentarioService.getAllComentarios();
      return reply.send(comentarios);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
      return reply.code(500).send({ error: 'Erro ao buscar comentários' });
    }
  });

  // Buscar comentário por ID
  fastify.get<{ Params: { id: string } }>('/:id',{ preHandler: authMiddleware }, async (req, reply) => {
    try {
      const comentario = await comentarioService.getComentarioById(req.params.id);
      if (!comentario) {
        return reply.code(404).send({ error: 'Comentário não encontrado' });
      }
      return reply.send(comentario);
    } catch (error) {
      console.error('Erro ao buscar comentário:', error);
      return reply.code(500).send({ error: 'Erro ao buscar comentário' });
    }
  });

  // Deletar comentário
  fastify.delete<{ Params: { id: string } }>('/:id',{ preHandler: authMiddleware }, async (req, reply) => {
    try {
      await comentarioService.deleteComentario(req.params.id);
      return reply.code(204).send();
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
      return reply.code(500).send({ error: 'Erro ao excluir comentário' });
    }
  });

  // Buscar comentários de um post específico
  fastify.get<{ Params: { postId: string } }>('/post/:postId',{ preHandler: authMiddleware }, async (req, reply) => {
    try {
      const comentarios = await comentarioService.getComentariosByPostId(req.params.postId);
      return reply.send(comentarios);
    } catch (error) {
      console.error('Erro ao buscar comentários do post:', error);
      return reply.code(500).send({ error: 'Erro ao buscar comentários do post' });
    }
  });
}
