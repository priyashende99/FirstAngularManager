import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren  } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { Project } from 'src/app/models/project';
import { ClientLocation } from 'src/app/models/client-location';
import { ClientLocationsService } from 'src/app/services/client-locations.service'
import { NgForm } from '@angular/forms';
import * as $ from "jquery";
import { ProjectComponent } from '../project/project.component';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit
{
  projects: Project[] = [];
  clientLocations: Observable<ClientLocation[]> | any = null;
  showLoading: boolean = true;

  newProject: Project = new Project();
  editProject: Project = new Project();
  editIndex: any = null;
  deleteProject: Project = new Project();
  deleteIndex: any = null;
  searchBy: string = '';
  searchText: string = '';

  currentPageIndex: number = 0;
  pages: any[] = [];
  pageSize: number = 3;

  @ViewChild("newForm") newForm: NgForm | any = null;
  @ViewChild("editForm") editForm: NgForm | any = null;

  constructor(private projectsService: ProjectsService, private clientLocationsService: ClientLocationsService) { 
    this.searchBy = "ProjectName";
    this.searchText= '';
  }

  ngOnInit()
  {
    this.projectsService.getAllProjects().subscribe((response: Project[]) =>
    {
      this.projects = response;
      this.showLoading = false;
      this.calculateNoOfPages();
    });

    this.clientLocations = this.clientLocationsService.getClientLocations();
  }

  calculateNoOfPages(){
    let filterPipe = new FilterPipe();
    var resultProjects = filterPipe.transform(this.projects, this.searchBy, this.searchText);
    var noOfPages = Math.ceil(resultProjects.length / this.pageSize);

    this.pages = [];
    for(let i = 0; i < noOfPages; i++){
      this.pages.push({pageIndex: i});
    }
    this.currentPageIndex = 0;
  }

  isAllChecked: boolean = false;

  @ViewChildren("prj") projs : QueryList<ProjectComponent> | any = null;

  isAllCheckedChange(event: any){
    let proj = this.projs.toArray();
    for(let i = 0; i < proj.length; i++){
      proj[i].isAllCheckedChange(this.isAllChecked);
    }
  }

  @ViewChild("prjID") prjID: ElementRef | any = null;

  onNewClick(event: any)
  {
    this.newForm.resetForm();    
    setTimeout(() => {
      this.prjID.nativeElement.focus();
    }, 500);
  }

  onSaveClick(){
    
    if (this.newForm.valid){      
      this.newProject.clientLocation.clientLocationID = 0;
      this.projectsService.insertProject(this.newProject).subscribe(
      (response) =>
      {
        //Add Project to Grid
        var p: Project = new Project();
        p.projectID = response.projectID;
        p.projectName = response.projectName;
        p.dateOfStart = response.dateOfStart;
        p.teamSize = response.teamSize;
        p.clientLocation = response.clientLocation;
        p.active = response.active;
        p.clientLocationID = response.clientLocationID;
        p.status = response.status;
        this.projects.push(p);
        

        //Clear New Project Dialog - TextBoxes
        this.newProject.projectID = null;
        this.newProject.projectName = null;
        this.newProject.dateOfStart = null;
        this.newProject.teamSize = null;
        this.newProject.active = false;
        this.newProject.clientLocationID = null;
        this.newProject.status = null;
        $("#newFormCancel").trigger("click");
        this.calculateNoOfPages();
      },
      (error) =>
      {
        console.log(error);
      }
    );
    }
  }

  @ViewChild("editPrjName") editPrjName: ElementRef | any = null;
  onEditClick(event: any, index: number)
  {
    this.editForm.resetForm();
    setTimeout(() => {
      this.editPrjName.nativeElement.focus();
      this.editProject.projectID = this.projects[index].projectID;
      this.editProject.projectName = this.projects[index].projectName;
      this.editProject.dateOfStart = this.projects[index].dateOfStart.split("/").reverse().join("-");
      this.editProject.teamSize = this.projects[index].teamSize;
      this.editProject.active = this.projects[index].active;
      this.editProject.clientLocation = this.projects[index].clientLocation;
      this.editProject.clientLocationID = this.projects[index].clientLocationID;
      this.editProject.status = this.projects[index].status;
      this.editIndex = index;
    }, 500);
  }

  onUpdateClick()
  {
    if (this.editForm.valid){
      this.projectsService.updateProject(this.editProject).subscribe(
        (response: Project) =>{
          var p: Project = new Project();
          p.projectID = response.projectID;
          p.projectName = response.projectName;
          p.dateOfStart = response.dateOfStart;
          p.teamSize = response.teamSize;
          p.clientLocation = response.clientLocation;
          p.active = response.active;
          p.clientLocationID = response.clientLocationID;
          p.status = response.status;
          this.projects[this.editIndex] = p;

          this.editProject.projectID = null;
          this.editProject.projectName = null;
          this.editProject.dateOfStart = null;
          this.editProject.teamSize = null;
          this.newProject.active = false;
          this.newProject.clientLocationID = null;
          this.newProject.status = null;
        },
        (error) =>
        {
          console.log(error);
        }
      );
    }
  }

  onDeleteClick(event: any, index: number)
  {
    this.deleteIndex = index;
    this.deleteProject.projectID = this.projects[index].projectID;
    this.deleteProject.projectName = this.projects[index].projectName;
    this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
    this.deleteProject.teamSize = this.projects[index].teamSize;
  }

  onDeleteConfirmClick()
  {
    this.projectsService.deleteProject(this.deleteProject.projectID).subscribe(
      (response) =>
      {
        this.projects.splice(this.deleteIndex, 1);
        this.deleteProject.projectID = null;
        this.deleteProject.projectName = null;
        this.deleteProject.teamSize = null;
        this.deleteProject.dateOfStart = null;
        this.calculateNoOfPages();
      },
      (error) =>
      {
        console.log(error);
      }
    );
  }

  onSearchClick()
  {
    // this.projectsService
    //   .SearchProjects(this.searchBy, this.searchText)
    //   .subscribe(
    //     (response: Project[]) =>
    //     {
    //       this.projects = response;
    //     },
    //     (error) =>
    //     {
    //       console.log(error);
    //     }
    //   );
  }

  onSearchTextKeyup(){
    this.calculateNoOfPages();
  }

  onPageIndexClicked(pageIndex: number)
  {
    this.currentPageIndex = pageIndex;
  }
  
  onHideShowDetails(event: any){
    this.projectsService.toggleDetails();    
  }
}