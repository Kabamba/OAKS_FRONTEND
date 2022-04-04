import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AdminAuthService, private router: Router){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
    return this.auth.statut().pipe(
      map((LoggedIn:boolean) =>{
        if(LoggedIn){
          return true
        }else{
          return this.router.navigate(['/admin/login']);
        }
      })
    )
  }
  
}
