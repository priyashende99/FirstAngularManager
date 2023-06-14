import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientLocation } from '../models/client-location';

@Injectable({
  providedIn: 'root'
})
export class ClientLocationsService {
  urlPrefix: string = "http://localhost:9090";
  constructor(private httpClient: HttpClient) { }

  getClientLocations(): Observable<ClientLocation[]>{
    // return this.httpClient.get<ClientLocation[]>("/api/clientlocations", {responseType: "json"});
    return this.httpClient.get<ClientLocation[]>(this.urlPrefix + "/api/clientlocations", { responseType: "json" });
  }
}
