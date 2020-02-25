import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService
    ) { }

    canActivate(
        route: import("@angular/router").ActivatedRouteSnapshot, 
        state: import("@angular/router").RouterStateSnapshot): boolean 
            | import("@angular/router").UrlTree 
            | import("rxjs").Observable<boolean 
            | import("@angular/router").UrlTree> 
            | Promise<boolean | import("@angular/router").UrlTree> {
        const currentUser = this.authenticationService.currentUser;
        if (currentUser) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return URL
        this.router.navigate(['/login', {queryParams: {returnUrl: state.url}}])
        return false;
    }
}