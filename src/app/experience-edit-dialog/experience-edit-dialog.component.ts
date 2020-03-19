import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface ExperienceData {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
};
@Component({
  selector: 'app-experience-edit-dialog',
  templateUrl: './experience-edit-dialog.component.html',
  styleUrls: ['./experience-edit-dialog.component.css']
})
export class ExperienceEditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ExperienceEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ExperienceData) { }

  ngOnInit() {
  }

}





