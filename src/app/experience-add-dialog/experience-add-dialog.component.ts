import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiHelperService, userInfo, Institution, UserExperiences} from "../api-helper.service";
import {FormControl, FormGroup} from "@angular/forms";

export interface userID {
  value: string;
};
@Component({
  selector: 'app-experience-add-dialog',
  templateUrl: './experience-add-dialog.component.html',
  styleUrls: ['./experience-add-dialog.component.css']
})
export class ExperienceAddDialogComponent implements OnInit {

  userExperienceForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ExperienceAddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: userID, private api: ApiHelperService) { }

  ngOnInit() {
    this.userExperienceForm = new FormGroup ({
      positionName: new FormControl(),
      companyName: new FormControl(),
      positionDescription: new FormControl(),
      positionStartDate: new FormControl(),
      positionEndDate: new FormControl()
    })
  }

  submitUserExperience() {
    let previousExperience = {
      positionName: this.userExperienceForm.value.positionName,
      companyName: this.userExperienceForm.value.companyName,
      positionDescription:  this.userExperienceForm.value.positionDescription,
      positionStartDate:  this.userExperienceForm.value.positionStartDate,
      positionEndDate:  this.userExperienceForm.value.positionEndDate
    };
    this.api.submitPreviousExperience(previousExperience, this.data).subscribe(response => {
    })
  }
}
