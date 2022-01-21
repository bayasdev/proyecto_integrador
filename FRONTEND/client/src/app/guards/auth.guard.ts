import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token: string = sessionStorage.getItem('token') as string;
      let isValid: boolean = this.check_token(token);
      if (token == null || !isValid) {
        sessionStorage.clear();
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    
    canActivateChild(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.canActivate(route, state);
    }
    
    check_token(token: string): boolean {
      try {
        let decoded: any = jwt_decode(token);
        let current_time: number = Math.round((new Date()).getTime() / 1000);
        if (decoded.expiration_time - current_time <= 0){
          return false;
        } else {
          return true;
        }
      } catch (e) {
        return false;
      }
    }
    
  }
  