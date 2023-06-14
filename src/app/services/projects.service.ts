import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { Project } from '../models/project';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseURL =  "http://localhost:9090";
  public MySubject: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient) { 
    this.MySubject = new BehaviorSubject<boolean>(false);
  }

  toggleDetails(){
    this.MySubject.next(!this.MySubject.value);
  }

  getAllProjects() : Observable<Project[]>{
    // var currentUser = {token:""};
    // var headers = new HttpHeaders();
    // headers = headers.set("Authorization", "Bearer");
    // if(sessionStorage['currentUser'] != null){
    //   currentUser = JSON.parse(sessionStorage['currentUser']);
    //   headers = headers.set("Authorization", "Bearer " + currentUser.token);
    // }
    return this.httpClient.get<Project[]>(this.baseURL +"/api/projects", {responseType: "json"}).pipe(
      map((data: Project[]) =>
      {
        for (let i = 0; i < data.length; i++)
        {
          // data[i].teamSize = data[i].teamSize * 100;
        }
        return data;
      })
    );
  }

  getProjectByProject(ProjectID:number):Observable<Project>{
    return this.httpClient.get<Project>(this.baseURL +"/api/projects/searchbyprojectid/" + ProjectID, {responseType:"json"});
  }

  insertProject(newProject: Project) : Observable<Project>{
    // var requestHeaders = new HttpHeaders();
    // requestHeaders = requestHeaders.set("X-XSRF-TOKEN", sessionStorage['XSRFRequestToken']);
    // return this.httpClient.post<Project>(this.baseURL + "/api/projects", newProject, { headers: requestHeaders, responseType: "json" });
    return this.httpClient.post<Project>(this.baseURL +"/api/projects", newProject, {responseType: "json"});
    // var requestHeaders = new HttpHeaders();
    // requestHeaders = requestHeaders.set("X-XSRF-TOKEN", sessionStorage['XSRFRequestToken']);
    // return this.httpClient.post<Project>(this.baseURL + "/api/projects", newProject, { headers: requestHeaders, responseType: "json" });
  }

  updateProject(existingProject: Project) : Observable<Project>{
    return this.httpClient.put<Project>(this.baseURL +"/api/projects", existingProject, {responseType: "json"});
  }

  deleteProject(ProjectID: Project) : Observable<string>{
    return this.httpClient.delete<string>(this.baseURL +"/api/projects?ProjectID=" + ProjectID);
  }

  SearchProjects(searchBy: string, searchText: string): Observable<Project[]>
  {
    return this.httpClient.get<Project[]>(
      this.baseURL + '/api/projects/search/' + searchBy + '/' + searchText,
      { responseType: 'json' }
    );
  }

}
