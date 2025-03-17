import { Visibilidade, Status } from '@prisma/client';

export interface CreatePostDTO {
  usuarioId: string;
  conteudo: string;
  visibilidade: Visibilidade;
  status: Status;
}

export interface PostResponseDTO {
  id: string;
  usuarioId: string;
  conteudo: string;
  dataPublicacao: Date;
  visibilidade: Visibilidade;
  status: Status;
}