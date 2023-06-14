import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot  } from '@angular/router';
import { LoginService } from '../services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router, private jwtHelperService: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot) : boolean {
    // console.log(this.router.url);
    var token = sessionStorage.getItem("currentUser")? JSON.parse(sessionStorage.getItem("currentUser") as string).token:null;
    if(this.loginService.isAuthenticated() || this.jwtHelperService.decodeToken(token).role != route.data['expectedRole']){
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }
}
