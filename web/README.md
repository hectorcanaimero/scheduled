# Scheduled Web

Frontend público del flujo de confirmación de turnos.

```bash
cp .env.example .env.local
npm install
npm run dev
```

El enlace esperado es `/agendar/:clinicaId?token=:link_token`. La aplicación consulta `GET /agendamiento/:link_token` y confirma mediante `POST /agendamiento/:link_token/confirmar`.
