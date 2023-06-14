import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Designation: string = '';
  Username: string = '';
  NoOfTeamMembers: number = 0;
  TotalCostOfAllProject: number = 0;
  PendingTasks: number = 0;
  UpcomingProjects: number = 0;
  ProjectCost: number = 0;
  CurrentExpenditure: number = 0;
  AvailableFunds: number = 0;
  ToDay: Date = new Date();

  Clients: string[] = [];
  Projects: string[] = [];
  Years: number[] = [];
  TeamMembersSummary: any[] = [];
  TeamMembers: any[] = [];

  constructor(private dashboardService: DashboardService){

  }

  ngOnInit(){
      this.Designation = 'Team Leader';
      this.Username = 'Priya Shende';
      this.NoOfTeamMembers = 67;
      this.TotalCostOfAllProject = 240;
      this.PendingTasks = 17;
      this.UpcomingProjects = 0.2;
      this.ProjectCost = 2113507;
      this.CurrentExpenditure = 96788;
      this.AvailableFunds = 52536;
      this.ToDay = new Date();

      this.Clients = [
        "ABC infotech Ltd.",
        "DEF Software Solution",
        "GHI Industries"
      ];

      this.Projects = [
        "Project A", "Project B", "Project C", "Project D"
      ];

      for(var i = 2019; i >= 2010; i--){
        this.Years.push(i);
      }

      this.TeamMembersSummary = this.dashboardService.getTeamMembersSummary();

      this.TeamMembers = [
        {
          Region: "East", Members: [
            { ID:1, Name:"Ford", Status:"Available"},
            { ID:2, Name:"Miller", Status:"Available"},
            { ID:3, Name:"Jones", Status:"Busy"},
            { ID:4, Name:"James", Status:"Busy"},
          ]
        },
        {
          Region: "West", Members: [
            { ID:5, Name:"Ford", Status:"Available"},
            { ID:6, Name:"Miller", Status:"Available"},
            { ID:7, Name:"Jones", Status:"Busy"},
            { ID:8, Name:"James", Status:"Busy"},
          ]
        },
        {
          Region: "South", Members: [
            { ID:9, Name:"Ford", Status:"Available"},
            { ID:10, Name:"Miller", Status:"Available"},
            { ID:11, Name:"Jones", Status:"Busy"},
            { ID:12, Name:"James", Status:"Busy"},
          ]
        },
        {
          Region: "North", Members: [
            { ID:13, Name:"Ford", Status:"Available"},
            { ID:14, Name:"Miller", Status:"Available"},
            { ID:15, Name:"Jones", Status:"Busy"},
            { ID:16, Name:"James", Status:"Busy"},
          ]
        }
      ];
  }

  onProjectChangin($event:any){
    if($event.target.innerHTML == "Project A"){
      this.ProjectCost = 2113507;
      this.CurrentExpenditure = 96788;
      this.AvailableFunds = 52536;
    } else if($event.target.innerHTML == "Project B"){
      this.ProjectCost = 3113507;
      this.CurrentExpenditure = 76788;
      this.AvailableFunds = 32536;
    } else if($event.target.innerHTML == "Project C"){
      this.ProjectCost = 1113507;
      this.CurrentExpenditure = 56788;
      this.AvailableFunds = 22536;
    } else if($event.target.innerHTML == "Project D"){
      this.ProjectCost = 3113507;
      this.CurrentExpenditure = 86788;
      this.AvailableFunds = 72536;
    }
  }
}
