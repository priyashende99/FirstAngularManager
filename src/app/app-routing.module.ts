import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/components/about/about.component';
import { CanActivateGuardService } from './guards/can-activate-guard.service';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"signup", component: SignUpComponent},
  {path:"about", component: AboutComponent},
  {path:"login", component: LoginComponent},
  {path:"admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
