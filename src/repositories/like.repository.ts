import { prisma } from "../database/prisma-client";
import { CurtidaDTO, CurtidaResponseDTO } from "../interfaces/like.dto";

export class CurtidaRepository {
  async curtirPost(data: CurtidaDTO): Promise<CurtidaResponseDTO> {
    return await prisma.curtida.create({
      data,
    });
  }

  async descurtirPost(usuarioId: string, postId: string): Promise<void> {
    await prisma.curtida.delete({
      where: {
        usuarioId_postId: { usuarioId, postId },
      },
    });
  }

  async getCurtidasByPostId(postId: string): Promise<CurtidaResponseDTO[]> {
    return await prisma.curtida.findMany({
      where: { postId },
    });
  }

  async getCurtidasByUsuarioId(usuarioId: string): Promise<CurtidaResponseDTO[]> {
    return await prisma.curtida.findMany({
      where: { usuarioId },
    });
  }

  async countCurtidasByPostId(postId: string): Promise<number> {
    return await prisma.curtida.count({
      where: { postId },
    });
  }
}
