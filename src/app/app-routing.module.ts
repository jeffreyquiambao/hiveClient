import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profileComponent/profile.component';
import { SearchComponent } from "./search/search.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: 'dashboard/:userid', component: DashboardComponent},
  { path: 'profile/:userid', component: ProfileComponent},
  { path: 'login/:userid', component: LoginComponent},
  { path: 'search/:userid', component: SearchComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
