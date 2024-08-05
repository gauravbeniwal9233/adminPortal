// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from './auth.service';
// import { inject } from '@angular/core';
// import { map } from 'rxjs';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService); // Inject AuthService
//   const router = inject(Router); // Inject Router for navigation

//   return authService.isLoggedIn$.pipe(
//     map((isLoggedIn: boolean) => {
//       if (!isLoggedIn) {
//         router.navigate(['auth/login']);
//         return false;

//       }
//       return true;
//     })
//   );
// };













import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this._authService.isLoggedIn$.pipe(
      map((_isLoggedIn: boolean) => {
        if (!_isLoggedIn) {
          this.router.navigate(['auth/login']);
          return false;
        }
        return true;
      })
    )
  }

}
