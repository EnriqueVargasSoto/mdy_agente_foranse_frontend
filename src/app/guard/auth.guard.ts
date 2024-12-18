import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token');

  if (token) {
    // Usuario autenticado, permite acceso
    return true;
  } else {
    // Usuario no autenticado, redirigir al login
    const router = inject(Router);
    router.navigate(['/auth/login']);
    return false;
  }
};
