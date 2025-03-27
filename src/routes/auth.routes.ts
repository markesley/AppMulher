import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', async (request, reply) => {
    const { email, senha } = request.body as { email: string; senha: string };

    // Busca o usuário no banco pelo Prisma
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return reply.code(401).send({ message: 'E-mail ou senha inválidos' });
    }

    // Gera o token JWT
    const token = app.jwt.sign({ id: usuario.id, email: usuario.email });

    // Armazena o token em um cookie httpOnly (impedindo acesso via JavaScript)
    reply.setCookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Em produção, usar HTTPS
      path: '/',
      maxAge: 3600 // Expira em 1 hora (em segundos)
    });

    return reply.send({ message: 'Login realizado com sucesso!' });
  });
}
