import { Injectable } from '@nestjs/common';

const BOOKING_KEYWORDS = [
  'turno',
  'turnos',
  'cita',
  'citas',
  'agendar',
  'agendarme',
  'reservar',
  'reserva',
  'consulta',
  'consultas',
  'hora',
  'horario',
  'médico',
  'medico',
  'doctor',
  'quiero',
  'necesito',
  'pedir',
  'sacar',
];

@Injectable()
export class IntentService {
  isBookingIntent(text: string): boolean {
    const normalized = text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    return BOOKING_KEYWORDS.some((kw) => normalized.includes(kw));
  }
}
