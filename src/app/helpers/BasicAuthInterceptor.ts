import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }
    
    intercept(
        req: import("@angular/common/http").HttpRequest<any>, 
        next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        const currentUser = this.authenticationService.currentUser;
        if (currentUser && currentUser.authdata) {
            req.clone({
                setHeaders: {
                    Authorization: `${currentUser.authdata}`
                }
            })
        }
        return next.handle(req);
    }
}