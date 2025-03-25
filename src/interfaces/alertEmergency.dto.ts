export interface CreateAlertaEmergenciaDTO {
    usuarioId: string;
    localizacao?: string;
    status: string; // ativo, atendido, cancelado
    descricao?: string;
}