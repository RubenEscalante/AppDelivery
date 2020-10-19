import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../autentificacion/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivateChild {
  constructor(
    public authService: AuthService,
    public router: Router

  ){}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isLoggedIn === true){
        this.router.navigate(['menu'])
        return false;
      
      }
      else {
        return true;
      }
  }
  
}
