# Scheduled Web

Frontend público del flujo de confirmación de turnos.
Frontend Next.js para la agenda de solo lectura del profesional.

```bash
cp .env.example .env.local
npm install
npm run dev
```

El enlace esperado es `/agendar/:clinicaId?token=:link_token`. La aplicación consulta `GET /agendamiento/:link_token` y confirma mediante `POST /agendamiento/:link_token/confirmar`.
La vista pública está en `/agenda/:link_token` y consulta `GET /agenda/:link_token`
en la URL configurada mediante `NEXT_PUBLIC_API_URL`.
