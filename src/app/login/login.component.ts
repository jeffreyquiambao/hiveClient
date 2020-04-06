import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import {ApiHelperService} from "../api-helper.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loginUser = new EventEmitter();

  decisionMade: boolean
  isNewUser: boolean;
  isExistingUser: boolean;
  onboarded: boolean;
  invalidLogin: boolean;
  newUserForm: FormGroup;
  existingUserForm: FormGroup;

  constructor(private api: ApiHelperService) { }

  ngOnInit() {
    this.decisionMade = false;
    this.isNewUser = false;
    this.isExistingUser = false;
    this.onboarded = false;
    this.invalidLogin = false;
    this.newUserForm = new FormGroup ({
      firstName: new FormControl(),
      lastName: new FormControl(),
      school: new FormControl(),
      educationStartDate: new FormControl(),
      graduationDate: new FormControl(),
      degree: new FormControl(),
      major: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });

    this.existingUserForm = new FormGroup ({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  newUser(){
    this.decisionMade = true;
    this.isNewUser = true;
  }

  newUserSubmit() {
    const newUserInfo = {
      'firstName': this.newUserForm.value.firstName,
      'lastName': this.newUserForm.value.lastName,
      'email': this.newUserForm.value.email,
      'password': this.newUserForm.value.password
    };
    this.api.createNewUser(newUserInfo).subscribe(userResponse => {
      const newInstitutionInfo = {
        'institutionName': this.newUserForm.value.school
      };
      this.api.createNewInstitution(newInstitutionInfo).subscribe(response => {
        this.userEducationSubmit(userResponse, response[0].institutionId);
      });
      this.onboarded = true;
    });
  }

  userEducationSubmit(userResponse, institutionId) {
    const userEducationInfo = {
      'degreeName': this.newUserForm.value.degree,
      'programName': this.newUserForm.value.major,
      'userId': userResponse.userId,
      'institutionId': institutionId,
      'educationStartDate': this.newUserForm.value.educationStartDate,
      'educationEndDate': this.newUserForm.value.graduationDate,
      'degreeLevel': this.newUserForm.value.degree,
      'current': true
    };
    console.log(userEducationInfo);
    this.api.submitUserEducation(userEducationInfo).subscribe(response => {
    })
  }

  existingUser(){
    this.decisionMade = true;
    this.isExistingUser = true;
  }

  existingUserSubmit() {
    const existingUserInfo = {
      'email': this.existingUserForm.value.email,
      'password': this.existingUserForm.value.password
    };
    this.api.logUserIn(existingUserInfo).subscribe(response => {
      if(response[0]){
        this.loginUser.emit(response);
      } else {
      this.invalidLogin = true;
        }
      }
    )
  }
}


