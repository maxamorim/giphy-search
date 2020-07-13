import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private snackBar: MatSnackBar) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.url.endsWith('config.json')) {
            return next.handle(request).pipe(
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.open('Oops! Something wrong happened. Try again.', 'X', { duration: 10000 });
                    return throwError(error);
                })
            );
        }

        return next.handle(request);
    }
}
