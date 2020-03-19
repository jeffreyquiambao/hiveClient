import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profileComponent/profile.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import { ProfileEditDialogComponent } from './profile-edit-dialog/profile-edit-dialog.component';
import {MatDialogModule} from "@angular/material";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput, MatInputModule} from "@angular/material/input";
import { ExperienceEditDialogComponent } from './experience-edit-dialog/experience-edit-dialog.component';
import { ExperienceAddDialogComponent } from './experience-add-dialog/experience-add-dialog.component';
import {MatChipsModule} from "@angular/material/chips";
import { AddSkillDialogComponent } from './add-skill-dialog/add-skill-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    MainNavComponent,
    SearchComponent,
    DashboardComponent,
    ProfileEditDialogComponent,
    ExperienceEditDialogComponent,
    ExperienceAddDialogComponent,
    AddSkillDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    RouterModule,
    FlexLayoutModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProfileEditDialogComponent, ExperienceEditDialogComponent, ExperienceAddDialogComponent, AddSkillDialogComponent],
})
export class AppModule { }
