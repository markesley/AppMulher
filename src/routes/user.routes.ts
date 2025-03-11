import { FastifyInstance } from 'fastify';
import { UserCreate } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserService();

  fastify.post<{ Body: UserCreate }>('/', async (req, reply) => {
    const { name, email, password } = req.body;

    try {
      const data = await userUseCase.create({ name, email, password });
      return reply.code(201).send(data);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return reply.code(500).send({ error: 'Erro ao criar usuário' });
    }
  });

  fastify.get('/', async (req, reply) => {
    return reply.send({ message: 'API de usuários funcionando!' });
  });
}
