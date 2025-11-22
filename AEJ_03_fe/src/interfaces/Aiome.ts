// Interfaz TypeScript para los datos de Aiome
export interface Aiome {
  id: number;
  question: string;
  response: string;
  status: string;
  date: string; // LocalDateTime como string ISO
  aitype: string;
}
