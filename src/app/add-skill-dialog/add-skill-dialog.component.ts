import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiHelperService, Tag, Tags} from "../api-helper.service";
import {FormControl, FormGroup} from "@angular/forms";

export interface userID {
  value: string;
};


@Component({
  selector: 'app-add-skill-dialog',
  templateUrl: './add-skill-dialog.component.html',
  styleUrls: ['./add-skill-dialog.component.css']
})
export class AddSkillDialogComponent implements OnInit {
  availableTags: Tag[];
  newSkillForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddSkillDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: userID, private api: ApiHelperService) { }

  ngOnInit() {
    this.newSkillForm = new FormGroup({
      tagId: new FormControl()
    });
    //get all available tags
    this.api.getAllTags().subscribe((allTags: Tags) =>{
      this.availableTags = allTags;
    });
  }

  submitNewSkill() {
    let newSkill = {
      tagId: this.newSkillForm.value.tagId
    };
    console.log(newSkill.tagId);
    this.api.createUserSkill(this.data, newSkill.tagId).subscribe(response => {
      console.log(response);
    })

  }

}




