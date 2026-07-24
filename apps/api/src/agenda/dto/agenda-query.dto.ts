export class AgendaQueryDto {
  /** YYYY-MM-DD — filtra por día exacto */
  fecha?: string;

  /** YYYY-MM-DD — inicio del rango (inclusivo) */
  fecha_inicio?: string;

  /** YYYY-MM-DD — fin del rango (inclusivo) */
  fecha_fin?: string;
}
