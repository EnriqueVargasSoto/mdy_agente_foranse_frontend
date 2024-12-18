import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Comprueba si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token existe
  }

  // Método para guardar el token en el localStorage (opcional)
  login(data: any): void {


    localStorage.setItem('token', data.access_token);
    localStorage.setItem('token_type', data.token_type);
    localStorage.setItem('persona', JSON.stringify(data.persona));
    localStorage.setItem('centros', JSON.stringify(data.centros));
    localStorage.setItem('paises', JSON.stringify(data.paises));
    localStorage.setItem('segmentos', JSON.stringify(data.segmentos));
    localStorage.setItem('campana', JSON.stringify(data.campana));
    localStorage.setItem('expires_in', data.expires_in);
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
  }
}
