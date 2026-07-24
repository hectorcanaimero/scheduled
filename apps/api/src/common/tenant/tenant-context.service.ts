import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

@Injectable()
export class TenantContextService {
  /**
   * Setea `app.clinica_id` local a la transacción activa.
   * Debe llamarse dentro de una transacción ya iniciada (startTransaction).
   * El valor se resetea automáticamente al hacer COMMIT o ROLLBACK.
   */
  async setTenant(queryRunner: QueryRunner, clinicaId: string): Promise<void> {
    await queryRunner.query(`SELECT set_config('app.clinica_id', $1, true)`, [
      clinicaId,
    ]);
  }

  /**
   * Limpia el tenant de la sesión (fuera de transacción, valor persiste en la conexión).
   * Llamar al devolver la conexión al pool si se usó fuera de una tx.
   */
  async clearTenant(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SELECT set_config('app.clinica_id', '', false)`);
  }
}
