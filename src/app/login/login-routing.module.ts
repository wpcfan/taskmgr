import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }