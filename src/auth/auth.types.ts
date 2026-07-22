export interface JwtPayload {
  sub: string;
  clinica_id: string;
  nombre: string;
  iat?: number;
  exp?: number;
}
