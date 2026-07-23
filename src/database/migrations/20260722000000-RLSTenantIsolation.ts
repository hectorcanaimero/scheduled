import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Habilitá RLS con política tenant_isolation en todas las tablas de negocio.
 *
 * Estrategia:
 *  - La app setea `app.clinica_id` vía set_config() al inicio de cada transacción
 *    autenticada o al encontrar el agendamiento por link_token.
 *  - La política permite acceso cuando `app.clinica_id` es NULL (lookup inicial
 *    por token sin contexto de tenant) o cuando coincide con la fila.
 *  - Esto garantiza que operaciones autenticadas (recepción) nunca cruzan tenants,
 *    y que el flujo público por link_token queda protegido por la opacidad del token.
 */
export class RLSTenantIsolation20260722000000 implements MigrationInterface {
  name = 'RLSTenantIsolation20260722000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // --- agendamientos ---
    await queryRunner.query(
      `ALTER TABLE "agendamientos" ENABLE ROW LEVEL SECURITY`,
    );
    await queryRunner.query(
      `ALTER TABLE "agendamientos" FORCE ROW LEVEL SECURITY`,
    );
    await queryRunner.query(`
      CREATE POLICY tenant_isolation ON "agendamientos"
        USING (
          current_setting('app.clinica_id', true) IS NULL
          OR current_setting('app.clinica_id', true) = ''
          OR clinica_id::text = current_setting('app.clinica_id', true)
        )
        WITH CHECK (
          current_setting('app.clinica_id', true) IS NULL
          OR current_setting('app.clinica_id', true) = ''
          OR clinica_id::text = current_setting('app.clinica_id', true)
        )
    `);

    // --- bloqueos_horario ---
    await queryRunner.query(
      `ALTER TABLE "bloqueos_horario" ENABLE ROW LEVEL SECURITY`,
    );
    await queryRunner.query(
      `ALTER TABLE "bloqueos_horario" FORCE ROW LEVEL SECURITY`,
    );
    await queryRunner.query(`
      CREATE POLICY tenant_isolation ON "bloqueos_horario"
        USING (
          current_setting('app.clinica_id', true) IS NULL
          OR current_setting('app.clinica_id', true) = ''
          OR clinica_id::text = current_setting('app.clinica_id', true)
        )
        WITH CHECK (
          current_setting('app.clinica_id', true) IS NULL
          OR current_setting('app.clinica_id', true) = ''
          OR clinica_id::text = current_setting('app.clinica_id', true)
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP POLICY IF EXISTS tenant_isolation ON "bloqueos_horario"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bloqueos_horario" DISABLE ROW LEVEL SECURITY`,
    );

    await queryRunner.query(
      `DROP POLICY IF EXISTS tenant_isolation ON "agendamientos"`,
    );
    await queryRunner.query(
      `ALTER TABLE "agendamientos" DISABLE ROW LEVEL SECURITY`,
    );
  }
}
