import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {userID} from "../experience-add-dialog/experience-add-dialog.component";
import {Job} from "../search/search.component";



@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: {'jobData': Job, 'companyName': string}) { }

  ngOnInit() {
  }

}
