// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthService } from '../components/auth/auth.service';
// import { switchMap, take } from 'rxjs';

// export const requestInterceptor: HttpInterceptorFn = (req, next) => {
// const authService = inject(AuthService);

// debugger;
// return authService.isLoggedIn$.pipe(
//   take(1), // Only take the latest value
//   switchMap((isLoggedIn) => {
//     if (isLoggedIn) {
//       // If user is logged in, fetch the current user
//       return authService.currentUser$.pipe(
//         take(1), // Again, take only the latest value
//         switchMap((currentUser) => {
//           // Clone the request and set the Authorization header
//           const authReq = req.clone({
//             setHeaders: {
//               Authorization: `Bearer ${currentUser.token}`,
//             },
//           });

//           // Continue with the modified request
//           return next(authReq);
//         })
//       );
//     } else {
//       // If not logged in, continue without modifying the request
//       return next(req);
//     }
//   })
// );
// };




import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../components/auth/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // debugger;
    let request: any;
    let currentUser: any;
    let isLoggedIn: boolean;

    this._authService.isLoggedIn$.subscribe(res => {
      isLoggedIn = res;

      if (isLoggedIn) {
        this._authService.currentUser$.subscribe(res => {
          currentUser = res;
          request = req.clone({
            setHeaders: {
              'Authorization': `Bearer ${currentUser.token}`
            }
          });
        });
      } 
    });

    return next.handle(request != undefined ? request : req);
  }
}




