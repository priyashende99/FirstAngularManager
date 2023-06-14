import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterLoggerService {
  private httpClient: HttpClient | any = null;
  currentUsername: string | null = null;
  private baseURL =  "http://localhost:9090";

  constructor(private httpBackend: HttpBackend) { }

  public log(logMsg: string): Observable<any>{
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post(this.baseURL + "/api/routerlogger", {log: logMsg },
    );
  }
}
