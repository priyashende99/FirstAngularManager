import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginViewModel } from '../models/login-view-model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SignUpViewModel } from '../models/sign-up-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient: HttpClient | null = null;
  baseURL =  "http://localhost:9090";
  constructor(private httpBackend: HttpBackend, private jwtHelperService : JwtHelperService) { 

  }

  currentUsername: any = null;

  public Login(loginViewModel: LoginViewModel): Observable<any>{
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(this.baseURL + "/authenticate", loginViewModel, {responseType: "json"}).pipe(map(user => {
      if(user) {
        // this.currentUsername = user.UserName;
        this.currentUsername = user.userName;
        sessionStorage['currentUser'] = JSON.stringify(user);
      }
      return user;
    }));
  }

  public Register(signUpViewModel: SignUpViewModel): Observable<any>{
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(this.baseURL + "/register", signUpViewModel, {responseType: "json", observe:"response"}).pipe(map(response => {
      if(response){
        this.currentUsername = response.body.userName;
        sessionStorage['currentUser'] = JSON.stringify(response.body);
        sessionStorage['XSRFRequestToken'] = response.headers.get("XSRF-REQUEST-TOKEN");
      }
      return response.body;
    }))
  }

  getUserByEmail(Email: string): Observable<any>{
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>(this.baseURL + "/api/getUserByEmail/" + Email, {responseType: "json"});
  }

  public Logout(){
    sessionStorage.removeItem("currentUser");
    this.currentUsername = null;
  }

  public isAuthenticated(): boolean{
    var token = sessionStorage.getItem("currentUser")? JSON.parse(sessionStorage.getItem("currentUser") as string).token:null;
    if(this.jwtHelperService.isTokenExpired()){
      return false;
    } else {
      return true;
    }
  }
}
