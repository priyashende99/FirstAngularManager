import { Component, OnInit, Input, Output, EventEmitter, ContentChild, ContentChildren, QueryList, SimpleChanges, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, ViewChild, ElementRef} from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  @Input("currentProject") project: Project| any = null;
  @Input("recordIndex") i: number = 0;
  @Output() editClick = new EventEmitter;
  @Output() deleteClick = new EventEmitter;

  MySubscription: Subscription | any;
  hideDetails: boolean = false;

  constructor(public projectsService: ProjectsService){}

  ngOnChanges(simpleChanges: SimpleChanges){
    // console.log("....................ng On Changes Called");
    for(let propName in simpleChanges){
      let chng = simpleChanges[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      // console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);

      if (simpleChanges["project"]){
        // this.project.teamSize += 1;
      }
      
    }
  }

  ngOnInit(){
    // console.log("..........OnInit Called");
    
    this.MySubscription = this.projectsService.MySubject.subscribe((hide)=>{
      this.hideDetails = hide;
    })
  }

  ngDoCheck() {
      // console.log("............DoCheck Called");
      
  }

  ngAfterContentInit() {
    // console.log("............ngAfterContentInit Called");
    // console.log(this.selectionBoxes.toArray());
  }

  ngAfterContentChecked() {
    // console.log("............ngAfterContentChecked Called");
  }

  ngAfterViewInit() {
    // console.log("............ngAfterViewInit Called");
    // console.log(this.tbl);
    
  }

  @ViewChild("tbl") tbl : ElementRef | any = null;

  ngAfterViewChecked() {
    // console.log("............ngAfterViewChecked Called"); 
  }

  onEditClick(event: any, i: number){
    this.editClick.emit({event, i});
  }

  onDeleteClick(event: any, i: number){
    this.deleteClick.emit({event, i});
  }

  // ngOnDestroy()
  // {
  //   console.log("............ngOnDestroy Called");
  //   this.MySubscription.unsubscribe();
  // }

  @ContentChildren("selectionBox") selectionBoxes: QueryList<CheckBoxPrinterComponent>| any = null;

  isAllCheckedChange(b: boolean){
    let selectionBox = this.selectionBoxes.toArray();
    if(b){
      for(let i = 0; i < selectionBox.length; i++){
        selectionBox[i].check();
      }
      
    } else {
      for(let i = 0; i < selectionBox.length; i++){
        selectionBox[i].unCheck();
      }
    }
  }
}
