import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from './login';
import { LoginComponent } from "./login/login/login.component";

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent,
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoginModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }