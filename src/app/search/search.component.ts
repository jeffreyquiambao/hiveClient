import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiHelperService, Tag, Tags} from "../api-helper.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

export interface Job {
  jobId: string,
  employerId: string,
  title: string;
  postingDate: string;
  applicationDeadline: string;
  season: string;
  jobLength: string;
  description: string;
  location: string;
  jobApplicationUrl: string;
}

export interface Jobs extends Array<Job>{};


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
  skillsForm: FormGroup;
  possibleSkills: Tag[];
  queriedJobs: Job[];
  userId: string;
  constructor(private api: ApiHelperService, private route:ActivatedRoute) {
    const id:Observable<any> = route.params;
    id.subscribe(val => this.userId = val.userid);
  }
  public exampleJob = {
    title: 'Continuous Improvement',
    company: 'Flipp',
    duration: 'Summer 2020',
    location: 'Toronto, ON',
    jobID: 'exampleID'
  }
  public exampleJob2 = {
    title: 'Product Management',
    company: 'Loblaw Digital',
    duration: 'Summer 2020',
    location: 'Toronto, ON',
    jobID: 'exampleID'
  }
  public exampleJob3 = {
    title: 'Software Engineer',
    company: 'Ruby',
    duration: 'Summer 2020',
    location: 'Toronto, ON',
    jobID: 'exampleID'
  }
  ngOnInit() {
    this.skillsForm = new FormGroup ({
      skillsToSearch: new FormControl()
    })

    //get all possible tags
    this.api.getAllTags().subscribe((tags: Tags) => {
      this.possibleSkills = tags;
    });
  }

  submitSearchQuery() {
    let arrayOfSkillTags =[];
    this.skillsForm.value.skillsToSearch.forEach(tag => {
      arrayOfSkillTags.push(tag.tagId);
    });

    this.api.searchForJobs(arrayOfSkillTags).subscribe((queriedJobs: Jobs) => {
      this.queriedJobs = queriedJobs;
      console.log(queriedJobs);
    });

  }

}
