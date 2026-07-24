# Scheduled Web

Panel web de recepción.

## Desarrollo

1. Copiar `.env.example` a `.env.local`.
2. Definir `API_URL` con la URL del backend NestJS.
3. Ejecutar `npm install` y `npm run dev`.

El login se envía al Route Handler `/api/auth/login`, que delega en el backend
y guarda el token resultante en una cookie `httpOnly`.
