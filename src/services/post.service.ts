import { PostRepository } from '../repositories/post.repository';
import { CreatePostDTO, PostResponseDTO } from '../interfaces/post.dto';

export class PostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async create(data: CreatePostDTO): Promise<PostResponseDTO> {
    return this.postRepository.create(data);
  }

  async findAll(): Promise<PostResponseDTO[]> {
    return this.postRepository.findAll();
  }
}