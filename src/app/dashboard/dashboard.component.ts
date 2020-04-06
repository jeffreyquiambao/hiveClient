import { Component, OnInit } from '@angular/core';
import {ApiHelperService, Tag} from "../api-helper.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Job, Jobs} from "../search/search.component";
import {SavedApplications} from "../job-card/job-card.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  userId: string;
  savedJobs: Job[];
  recommendedJobs: Job[];
  public exampleJob = {
    title: 'Continuous Improvement',
    company: 'Flipp',
    duration: 'Summer 2020',
    location: 'Toronto, ON',
    status: 'Applied',
    jobID: 'exampleID'
  }

  public exampleRecJob = {
    title: 'Continuous Improvement',
    company: 'Flipp',
    duration: 'Summer 2020',
    location: 'Toronto, ON',
    status: null,
    jobID: 'exampleID'
  }
  constructor(private api: ApiHelperService, private route:ActivatedRoute) {
    const id:Observable<any> = route.params;
    id.subscribe(val => this.userId = val.userid);
  }

  ngOnInit() {
    let tempSavedJobs: Job[] = [];
    this.api.getSavedJobs(this.userId).subscribe((savedJobs: SavedApplications) => {
      savedJobs.forEach(savedJob => {
        tempSavedJobs.push(savedJob.JobPosting);
      })
    });
    this.savedJobs = tempSavedJobs;

    let tempRecommendedJobs: Job[] = [];
    this.api.getRecommendedJobs(this.userId).subscribe((recommendedJobs: Jobs) => {
      recommendedJobs.forEach(recommendedJob => {
        tempRecommendedJobs.push(recommendedJob);
      })
    });
    this.recommendedJobs = tempRecommendedJobs;
  }

}
