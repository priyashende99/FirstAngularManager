import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface CanComponentDeactivate{
  canLeave: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(component: CanComponentDeactivate){
      if(component.canLeave == true){
        return true;
      } else{
        return confirm("Do You Want To Discard Changes?");
      }
  }

  constructor() { }
}
