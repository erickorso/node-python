export interface Item {
  id: number;
  nombre: string;
  categoria: string;
}

export interface ContactRequest {
  nombre: string;
  email: string;
  mensaje: string;
}

export interface ApiResponse {
  mensaje: string;
  fecha: string;
  endpoints: string[];
}

export interface SaludoResponse {
  mensaje: string;
  tip: string;
}

export interface ContactResponse {
  exito: boolean;
  mensaje: string;
}