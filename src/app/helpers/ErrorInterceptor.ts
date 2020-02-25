import { Injectable } from "@angular/core";
import { HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticationService) {}

    intercept(
        req: import("@angular/common/http").HttpRequest<any>, 
        next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response 
                this.authenticationService.logout();
                location.reload(true);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}