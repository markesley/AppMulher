export interface CreateContatoEmergenciaDTO {
    nome: string;
    numero: string;
    descricao?: string;
    tipo: string; // polícia, campus, saúde, etc.
    icone?: string;
    cor?: string;
}
  