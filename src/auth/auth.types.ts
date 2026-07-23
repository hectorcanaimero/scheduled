export interface JwtPayload {
  sub: string;
  clinica_id: string;
  nombre: string;
  iat?: number;
  exp?: number;
}

export interface LoginResponse {
  access_token: string;
  usuario: {
    id: string;
    nombre: string;
    clinica_id: string;
  };
}
