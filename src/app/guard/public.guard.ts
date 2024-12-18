import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const publicGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token');

  if (token) {
    // Si el usuario está autenticado, redirigir al dashboard
    const router = inject(Router);
    router.navigate(['/dashboard']);
    return false; // No permite acceso al login
  }

  return true;
};
