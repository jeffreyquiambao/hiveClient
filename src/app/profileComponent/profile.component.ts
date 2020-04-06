import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {ProfileEditDialogComponent} from "../profile-edit-dialog/profile-edit-dialog.component";
import {ExperienceEditDialogComponent} from "../experience-edit-dialog/experience-edit-dialog.component";
import {ExperienceAddDialogComponent} from "../experience-add-dialog/experience-add-dialog.component";
import {AddSkillDialogComponent} from "../add-skill-dialog/add-skill-dialog.component";
import {ActivatedRoute} from '@angular/router';
import {Observable} from "rxjs";
import {ApiHelperService, userInfo, Institution, UserExperiences, Experience, Tags, Tag} from "../api-helper.service";
import forEach from "lodash";
@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    firstName: string;
    lastName: string;
    recentInstitution: string;
    graduationDate: any;
    degreeLevel: string;
    programName: string;

    id: string;
    previousPositions: Experience[];
    userSkills : Tag[];
    possibleSkills: Tag[];

  constructor(public dialog: MatDialog, private route:ActivatedRoute, private api: ApiHelperService) {
    const id:Observable<any> = route.params;
     id.subscribe(val => this.id = val.userid);
  }

  ngOnInit() {
  //get all possible tags
    this.api.getAllTags().subscribe((tags: Tags) => {
      this.possibleSkills = tags;
    });
  //get users basic information
    this.api.getBasicUserInformation(this.id).subscribe((userInformation: userInfo) => {
      this.firstName = userInformation.firstName ;
      this.lastName = userInformation.lastName ;
      this.graduationDate = userInformation.userEducation[0].educationEndDate.substring(0, 4);
      this.degreeLevel = userInformation.userEducation[0].degreeLevel;
      this.programName = userInformation.userEducation[0].programName;
      this.api.getInstitutionName(userInformation.userEducation[0].institutionId).subscribe((institution: Institution) => {
        this.recentInstitution = institution.institutionName;
      })
    });

   //get users previous experience
    this.api.getPreviousExperience(this.id).subscribe((userExperiences: UserExperiences) => {
      this.previousPositions = userExperiences;
    });

   //get users skills
    this.api.getAllUserTags(this.id).subscribe((userTags: Tags) => {
      let tempUserSkills: Tag[] = [];
      userTags.forEach(userTag => {
        this.possibleSkills.forEach(possibleSkill => {
          if(userTag.tagId === possibleSkill.tagId) {
            tempUserSkills.push({'tagId': userTag.tagId, 'tagName': possibleSkill.tagName})
          }
        });
      });
      this.userSkills = tempUserSkills;
      console.log(this.userSkills);
    })
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(ProfileEditDialogComponent, {height: '400px', width: '600px'});
    dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed')
    })
  }

  openExperienceEditDialog(experience): void {
    const dialogRef = this.dialog.open(ExperienceEditDialogComponent, {height: '400px', width: '600px', data: experience});
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed')
    })
  }

  addExperienceEditDialog(): void {
    const dialogRef = this.dialog.open(ExperienceAddDialogComponent, {height: '400px', width: '600px', data: this.id});
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed')
    })
  }

  addSkillDialog(): void {
    const dialogRef = this.dialog.open(AddSkillDialogComponent, {height: '225px', width: '400px', data: this.id});
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  removeSkill(skill): void {
    this.api.deleteUserSkill(this.id, skill.tagId).subscribe(response => {
      this.ngOnInit();
    })
  }

  deleteExperience(positionId: string) {
    this.api.deletePreviousExperience(positionId, this.id).subscribe(response => {
      this.ngOnInit();
    })
  }
}
