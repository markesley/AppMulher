import { FastifyRequest, FastifyReply } from 'fastify';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.cookies.token;
    if (!token) {
      return reply.code(401).send({ message: 'Token não fornecido' });
    }

    // Verifica o token utilizando o Fastify JWT diretamente
    const payload = await request.server.jwt.verify(token);
    request.user = payload; // Opcional: Adicionar payload ao request para uso posterior

  } catch (err) {
    return reply.code(401).send({ message: 'Não autorizado' });
  }
}
