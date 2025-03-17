import { FastifyInstance } from 'fastify';
import { PostService } from '../services/post.service';
import { CreatePostDTO } from '../interfaces/post.dto';

export async function postRoutes(fastify: FastifyInstance) {
  const postService = new PostService();

  fastify.post<{ Body: CreatePostDTO }>('/', async (req, reply) => {
    try {
      const post = await postService.create(req.body);
      return reply.code(201).send(post);
    } catch (error) {
      console.error('Erro ao criar post:', error);
      return reply.code(500).send({ error: 'Erro ao criar post' });
    }
  });

  fastify.get('/', async (_, reply) => {
    const posts = await postService.findAll();
    return reply.send(posts);
  });
}