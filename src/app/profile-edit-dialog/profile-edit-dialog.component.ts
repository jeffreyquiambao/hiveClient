import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface ProfileData {
  firstName: string;
  lastName: string;
  recentEducation: string;
  graduationDate: string;
  degree: string;
  degreeName: string;
};
@Component({
  selector: 'app-profile-edit-dialog',
  templateUrl: './profile-edit-dialog.component.html',
  styleUrls: ['./profile-edit-dialog.component.css']
})


export class ProfileEditDialogComponent {
  givenProfileData: ProfileData;
  constructor(
    public dialogRef: MatDialogRef<ProfileEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileData
  ) { }

  ngOnInit() {
    this.givenProfileData = this.data;
  }

}
