import { FastifyInstance } from "fastify";
import { CurtidaService } from "../services/like.service";
import { CurtidaDTO } from "../interfaces/like.dto";

export async function curtidaRoutes(fastify: FastifyInstance) {
  const curtidaService = new CurtidaService();

  // Curtir um post
  fastify.post<{ Body: CurtidaDTO }>("/", async (req, reply) => {
    try {
      const curtida = await curtidaService.curtirPost(req.body);
      return reply.code(201).send(curtida);
    } catch (error) {
      console.error("Erro ao curtir post:", error);
      return reply.code(500).send({ error: "Erro ao curtir post" });
    }
  });

  // Descurtir um post
  fastify.delete<{ Body: CurtidaDTO }>("/", async (req, reply) => {
    try {
      await curtidaService.descurtirPost(req.body.usuarioId, req.body.postId);
      return reply.code(204).send();
    } catch (error) {
      console.error("Erro ao descurtir post:", error);
      return reply.code(500).send({ error: "Erro ao descurtir post" });
    }
  });

  // Obter todas as curtidas de um post
  fastify.get<{ Params: { postId: string } }>("/post/:postId", async (req, reply) => {
    try {
      const curtidas = await curtidaService.getCurtidasByPostId(req.params.postId);
      return reply.send(curtidas);
    } catch (error) {
      console.error("Erro ao buscar curtidas do post:", error);
      return reply.code(500).send({ error: "Erro ao buscar curtidas do post" });
    }
  });

  // Contar curtidas de um post
  fastify.get<{ Params: { postId: string } }>("/post/:postId/count", async (req, reply) => {
    try {
      const count = await curtidaService.countCurtidasByPostId(req.params.postId);
      return reply.send({ count });
    } catch (error) {
      console.error("Erro ao contar curtidas do post:", error);
      return reply.code(500).send({ error: "Erro ao contar curtidas do post" });
    }
  });

  // Obter todas as curtidas de um usuário
  fastify.get<{ Params: { usuarioId: string } }>("/usuario/:usuarioId", async (req, reply) => {
    try {
      const curtidas = await curtidaService.getCurtidasByUsuarioId(req.params.usuarioId);
      return reply.send(curtidas);
    } catch (error) {
      console.error("Erro ao buscar curtidas do usuário:", error);
      return reply.code(500).send({ error: "Erro ao buscar curtidas do usuário" });
    }
  });
}
