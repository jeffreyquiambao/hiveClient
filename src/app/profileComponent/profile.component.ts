import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {ProfileEditDialogComponent} from "../profile-edit-dialog/profile-edit-dialog.component";
import {ExperienceEditDialogComponent} from "../experience-edit-dialog/experience-edit-dialog.component";
import {ExperienceAddDialogComponent} from "../experience-add-dialog/experience-add-dialog.component";
import {AddSkillDialogComponent} from "../add-skill-dialog/add-skill-dialog.component";

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   //example user object
    public exampleUser = {
    firstName: 'Jeffrey',
    lastName: 'Quiambao',
    recentEducation: 'University of Waterloo',
    graduationDate: 'Spring 2022',
    degree: 'BA/BS',
    degreeName: 'Swag Engineering',
    experience: [{
      title: 'Product Reliability Engineer Intern',
      company: 'Ten Thousand Coffees',
      startDate: 'Sep 2019',
      endDate: 'Dec 2019',
      description: 'The future of work has made talent development critical to the next generation of companies. Understanding that 70-90% of learning happens informally through colleagues, Ten Thousand Coffees has built the enterprise talent development platform for informal learning.\n'
    }, {
      title: 'Product Reliability Engineer',
      company: 'Ten Thousand Coffees',
      startDate: 'Sep 2019',
      endDate: 'Dec 2019',
      description: 'The future of work has made talent development critical to the next generation of companies. Understanding that 70-90% of learning happens informally through colleagues, Ten Thousand Coffees has built the enterprise talent development platform for informal learning.\n'
    }],
      skills: ['Product Management', 'Excel', 'League of Legends', 'Crying']
  };



  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    console.log(this.exampleUser.firstName)
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(ProfileEditDialogComponent, {height: '400px', width: '600px', data: this.exampleUser});
    dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed')
    })
  }

  openExperienceEditDialog(): void {
    const dialogRef = this.dialog.open(ExperienceEditDialogComponent, {height: '400px', width: '600px'});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    })
  }

  addExperienceEditDialog(): void {
    const dialogRef = this.dialog.open(ExperienceAddDialogComponent, {height: '400px', width: '600px'});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    })
  }

  addSkillDialog(): void {
    const dialogRef = this.dialog.open(AddSkillDialogComponent, {height: '225px', width: '400px'});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    })
  }

}
