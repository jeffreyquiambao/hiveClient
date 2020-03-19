import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface userID {
  value: string;
};
@Component({
  selector: 'app-experience-add-dialog',
  templateUrl: './experience-add-dialog.component.html',
  styleUrls: ['./experience-add-dialog.component.css']
})
export class ExperienceAddDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ExperienceAddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: userID) { }

  ngOnInit() {
  }

}
