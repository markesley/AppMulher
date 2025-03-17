import { prisma } from '../database/prisma-client';
import { CreatePostDTO, PostResponseDTO } from '../interfaces/post.dto';

export class PostRepository {
  async create(data: CreatePostDTO): Promise<PostResponseDTO> {
    const post = await prisma.post.create({ data });

    return {
      id: post.id,
      usuarioId: post.usuarioId,
      conteudo: post.conteudo,
      dataPublicacao: post.dataPublicacao,
      visibilidade: post.visibilidade,
      status: post.status,
    };
  }

  async findAll(): Promise<PostResponseDTO[]> {
    const posts = await prisma.post.findMany();
    return posts.map((post) => ({
      id: post.id,
      usuarioId: post.usuarioId,
      conteudo: post.conteudo,
      dataPublicacao: post.dataPublicacao,
      visibilidade: post.visibilidade,
      status: post.status,
    }));
  }
}
