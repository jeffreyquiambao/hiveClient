import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface userID {
  value: string;
};

@Component({
  selector: 'app-add-skill-dialog',
  templateUrl: './add-skill-dialog.component.html',
  styleUrls: ['./add-skill-dialog.component.css']
})
export class AddSkillDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddSkillDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: userID) { }

  ngOnInit() {
  }

}




