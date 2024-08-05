import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router for navigation

  return authService.isLoggedIn$.pipe(
    map((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        router.navigate(['auth/login']);
        return false;

      }
      return true;
    })
  );
};
