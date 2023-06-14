import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  baseURL: string =  "http://localhost:9090";

  constructor(private httpClient: HttpClient ) { }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<Country[]>(this.baseURL+"/api/countries", { responseType: "json" });
  }

  getCountryByCountryID(CountryID: number): Observable<Country>{
    return this.httpClient.get<Country>(this.baseURL+"/api/countries/searchbycountryid/" + CountryID, {responseType: "json"});
  }

  insertCountry(newCountry: Country): Observable<Country>{
    return this.httpClient.post<Country>(this.baseURL+"/api/countries", newCountry, {responseType: "json"});
  }

  updateCountry(existingCountry: Country): Observable<Country>{
    return this.httpClient.put<Country>(this.baseURL+"/api/countries", existingCountry, {responseType: "json"});
  }

  deleteCountry(CountryID:number | null): Observable<string>{
    return this.httpClient.delete<string>(this.baseURL+"/api/countries?countryID="+CountryID);
  }
}
