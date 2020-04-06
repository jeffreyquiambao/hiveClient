import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiHelperService} from "../api-helper.service";

export interface ExperienceData {
  positionId: string,
  userId: string,
  positionName: string,
  companyName: string,
  positionDescription: string,
  positionStartDate: string,
  positionEndDate: string,
};


@Component({
  selector: 'app-experience-edit-dialog',
  templateUrl: './experience-edit-dialog.component.html',
  styleUrls: ['./experience-edit-dialog.component.css']
})
export class ExperienceEditDialogComponent implements OnInit {
  experienceData: ExperienceData;
  updatedUserExperienceForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<ExperienceEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ExperienceData, private api: ApiHelperService) { }

  ngOnInit() {
    this.experienceData = this.data;
    this.updatedUserExperienceForm = new FormGroup ({
      positionName: new FormControl(this.experienceData.positionName),
      companyName: new FormControl(this.experienceData.companyName),
      positionDescription: new FormControl(this.experienceData.positionDescription),
      positionStartDate: new FormControl(this.experienceData.positionStartDate),
      positionEndDate: new FormControl(this.experienceData.positionEndDate)
    })
  }


  submitUpdatedUserExperience() {
    let updatedPreviousExperience = {
      positionName: this.updatedUserExperienceForm.value.positionName,
      companyName: this.updatedUserExperienceForm.value.companyName,
      positionDescription:  this.updatedUserExperienceForm.value.positionDescription,
      positionStartDate:  this.updatedUserExperienceForm.value.positionStartDate,
      positionEndDate:  this.updatedUserExperienceForm.value.positionEndDate
    };
console.log(updatedPreviousExperience);

    this.api.updatePreviousExperience(this.experienceData.positionId, this.experienceData.userId, updatedPreviousExperience).subscribe(response => {
    })
  }
}





