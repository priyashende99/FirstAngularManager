import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';
import { fadeAnimation, slideUpAnimation, zoomUpAnimation, zoomLeftAnimation } from './my-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ zoomLeftAnimation ]
})
export class AppComponent {
  title = 'firstangular';

  constructor(public loginService: LoginService){
    
  }

  getState(outlet: RouterOutlet){
    return outlet.isActivated ? outlet.activatedRoute.snapshot.url[0].path : "none";
  }
}
