import { prisma } from '../database/prisma-client';
import { User, UserCreate, UserRepository } from '../interfaces/user.interface';

class UserRepositoryPrisma implements UserRepository {
  async create(data: UserCreate): Promise<User> {
    const result = await prisma.usuario.create({
      data: {
        nome: data.name, // Ajustado para "nome"
        email: data.email,
        senha: data.password, // Ajustado para "senha"
      },
    });

    // Omitindo a senha antes de retornar o usuário
    const { senha, ...userWithoutPassword } = result;
    return {
      id: userWithoutPassword.id,
      name: userWithoutPassword.nome, // Ajuste ao retornar os dados
      email: userWithoutPassword.email,
      createdAt: userWithoutPassword.dataCadastro, // Certifique-se de incluir a data correta
      updatedAt: new Date(), // Se necessário, ajuste para um campo correto do banco
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.usuario.findFirst({
      where: { email },
    });

    if (!result) return null;

    // Omitindo a senha do resultado e ajustando os nomes dos campos
    const { senha, ...userWithoutPassword } = result;
    return {
      id: userWithoutPassword.id,
      name: userWithoutPassword.nome,
      email: userWithoutPassword.email,
      createdAt: userWithoutPassword.dataCadastro,
      updatedAt: userWithoutPassword.ultimoAcesso ?? new Date(), // Se "ultimoAcesso" for opcional, trate com `?? new Date()`
    };
  }
}

export { UserRepositoryPrisma };
