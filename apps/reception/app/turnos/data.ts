export const TURNO_ESTADOS = ["pendente", "confirmado", "cancelado"] as const;
export type TurnoEstado = (typeof TURNO_ESTADOS)[number];

export type Turno = Readonly<{
  id: string;
  hora: string;
  paciente: string;
  telefone: string;
  profissional: string;
  especialidade: string;
  estado: TurnoEstado;
}>;

export const turnos: readonly Turno[] = [
  { id: "t-101", hora: "08:30", paciente: "Mariana Costa", telefone: "+55 11 98842-1067", profissional: "Dra. Luísa Martins", especialidade: "Dermatologia", estado: "confirmado" },
  { id: "t-102", hora: "09:15", paciente: "Rafael Nunes", telefone: "+55 11 99731-4420", profissional: "Dr. Caio Mendes", especialidade: "Clínica geral", estado: "pendente" },
  { id: "t-103", hora: "10:00", paciente: "Ana Beatriz Lima", telefone: "+55 11 97518-0034", profissional: "Dra. Luísa Martins", especialidade: "Dermatologia", estado: "confirmado" },
  { id: "t-104", hora: "11:30", paciente: "João Pedro Alves", telefone: "+55 11 96402-7198", profissional: "Dr. Caio Mendes", especialidade: "Clínica geral", estado: "cancelado" },
  { id: "t-105", hora: "14:00", paciente: "Sofia Ribeiro", telefone: "+55 11 98640-3351", profissional: "Dra. Luísa Martins", especialidade: "Dermatologia", estado: "pendente" },
  { id: "t-106", hora: "15:45", paciente: "Bruno Ferreira", telefone: "+55 11 99176-8205", profissional: "Dr. Caio Mendes", especialidade: "Clínica geral", estado: "confirmado" },
];
