// import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
// import { catchError, map, retry, tap, throwError } from 'rxjs';

// export const responseInterceptor: HttpInterceptorFn = (req, next) => {
//   // Handle the request and apply transformations
//   return next(req).pipe(
//     retry(3), // Retry the request up to 3 times in case of errors
//     tap((event: HttpEvent<any>) => {
//       debugger;
//       if (event instanceof HttpResponse) {
//         // Log successful responses or perform any operation
//         console.log('Response intercepted:', event);
//       }
//     }),
//     map((event: HttpEvent<any>) => {
//       // Additional mapping logic can be added here
//       if (event instanceof HttpResponse) {
//         // Return the event if it's an HttpResponse
//         return event;
//       }
//       return event;
//     }),
//     catchError((error: HttpErrorResponse) => {
//       // Handle errors globally
//       let errMsg = '';
//       if (error.error instanceof ErrorEvent) {
//         // Client-side error
//         errMsg = `Error: ${error.message}`;
//       } else {
//         // Server-side error
//         errMsg = `Error Message: ${error.message} Error Status: ${error.status}`;
//       }
//       console.error('Error intercepted:', errMsg);
      
//       // Optionally, redirect to a login page or show a notification
//       // e.g., using a notification service
      
//       return throwError(() => new Error(errMsg)); // Use `throwError` to propagate error
//     })
//   );
// };



import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, filter, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      retry(3),  // Retry failed requests up to 3 times
      filter((event: HttpEvent<any>): event is HttpResponse<any> => event instanceof HttpResponse),
      catchError((err: HttpErrorResponse) => {
        let errMsg = '';
        if (err.error instanceof ErrorEvent) {
          // Client-side error
          errMsg = `Error: ${err.message}`;
        } else {
          // Server-side error
          errMsg = `Error Message: ${err.message} Error Status: ${err.status}`;
        }

        console.error('Error intercepted:', errMsg);
        return throwError(() => new Error(errMsg));  // Propagate error
      })
    );
  }
}


