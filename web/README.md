# Scheduled Web

Frontend Next.js para la agenda de solo lectura del profesional.

```bash
cp .env.example .env.local
npm install
npm run dev
```

La vista pública está en `/agenda/:link_token` y consulta `GET /agenda/:link_token`
en la URL configurada mediante `NEXT_PUBLIC_API_URL`.
