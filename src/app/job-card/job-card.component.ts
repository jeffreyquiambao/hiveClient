import { Component, OnInit, Input } from '@angular/core';
import {Job} from "../search/search.component";
import {ApiHelperService} from "../api-helper.service";
import {MatDialog} from "@angular/material/dialog";
import {JobDetailsComponent} from "../job-details/job-details.component";

export interface SavedApplication {
  "userId": string,
  "jobId": string,
  "employerId": string,
  "applicationId": string,
  "applicationStatus": string,
  "JobPosting": Job
}
export interface SavedApplications extends Array<SavedApplication>{};


@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
  @Input() job: Job;
  @Input() userId: string;
  companyName: any;
  saved: boolean;

  constructor(public dialog: MatDialog, private api: ApiHelperService) { }

  ngOnInit() {
    this.saved = false;
    this.api.getSavedJobs(this.userId).subscribe((applicationsInProgress: SavedApplications) => {
      applicationsInProgress.forEach(savedJob => {
        //console.log(savedJob);
        if (this.job.jobId === savedJob.jobId) {
          this.saved=true;
        }
      })
    });

    //get employer name from employer id
    this.api.getEmployerName(this.job.employerId).subscribe(employer => {
      this.companyName = employer[0].companyName;
    })
  }

  saveJob() {
    this.saved = true;
    console.log({'jobId': this.job.jobId, 'employerId': this.job.employerId});
    this.api.saveJob(this.userId, {"jobPosting":{'jobId': this.job.jobId, 'employerId': this.job.employerId}}).subscribe(response => {

    })

  }

  viewDetailsDialog(): void {
    const dialogRef = this.dialog.open(JobDetailsComponent, {height: '700px', width: '700px', data:{'jobData':this.job, 'companyName':this.companyName}});
    dialogRef.afterClosed().subscribe(result => {

    })
  }

  unsaveJob() {
    this.api.unsaveJob(this.userId, this.job.jobId).subscribe(response => {
      this.saved = false;

    });
  }
}
