import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import { Observable } from 'rxjs';
export interface userEducation {
  degreeName: string;
  programName: string;
  userId: string;
  institutionId: string;
  educationStartDate: string;
  educationEndDate: string;
  degreeLevel: string;
  current: string;
}
export interface userInfo {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userEducation: [userEducation]
}

export interface Institution {
  institutionId: string;
  institutionName: string;
}

export interface Experience {
  positionId: string,
  userId: string,
  positionName: string,
  positionDescription: string,
  positionStartDate: string,
  positionEndDate: string
  companyName: string
}

export interface Tag {
  tagId: string,
  tagName: string,
}

export interface UserExperiences extends Array<Experience>{};
export interface Tags extends Array<Tag>{};

@Injectable({
  providedIn: 'root'
})




export class ApiHelperService {
  address: string = "http://localhost:8000/api";
  constructor(private http: HttpClient) { }

  //CREATE NEW USER
  public createNewUser(newUserInfo){
  return this.http.post(this.address + "/users", newUserInfo);
  }

  //CHECK IF USER EXISTS AND RETURN ID IF TRUE
  public logUserIn(existingUserInfo) {
    return this.http.get(this.address + "/users" + "/"+ existingUserInfo.email + "/" +  existingUserInfo.password);
  }

  //CHECK IF INSTITUTION EXISTS, IF IT DOES RETURN ITS ID, IF IT DOESN'T CREATE A NEW INSTITUTION
  public createNewInstitution(newInstitutionInfo){
    return this.http.post(this.address + "/institution", newInstitutionInfo);
  }

  //SUBMIT USERS EDUCATION
  public submitUserEducation(educationInfo){
    return this.http.post(this.address + "/userProfile/newEducation", educationInfo);
  }

  //RETRIEVE USER INFORMATION FROM USER ID
  public getBasicUserInformation<userInfo>(userId) {
    return this.http.get(this.address + "/userProfile" + "/" + userId);
  }

  //RETRIEVE INSTITUTION NAME BASED ON ID
  public getInstitutionName<Institution>(institutionId) {
    return this.http.get(this.address + "/institution" + "/" + institutionId);
  }


  //RETRIEVE ALL AVAILABLE TAGS
  public getAllTags<Tag>() {
    return this.http.get(this.address + "/tags");
  }

  //RETRIEVE ALL OF A USERS TAGS
  public getAllUserTags<Tag>(userId) {
    return this.http.get(this.address + "/userProfile/" + userId + "/skills")
  }

  //ASSOCIATE A TAG WITH A USER
  public createUserSkill(userId, tagId) {
    return this.http.post(this.address + "/userProfile/" + userId + "/skills/" + tagId, {});
  }

  //DELETE A TAG FROM A USER
  public deleteUserSkill(userId, tagId) {
    return this.http.delete(this.address + "/userProfile/" + userId + "/skills/" + tagId);
  }

  //LOAD USERS EXPERIENCE
  public getPreviousExperience<UserExperiences>(userId) {
    return this.http.get(this.address + "/userProfile" + "/" + userId + "/previousPositions");
  }

  //CREATE USER EXPERIENCE
  public submitPreviousExperience(experience, userId){
    return this.http.post(this.address + "/userProfile" + "/" + userId + "/previousPositions", experience);
  }

  //DELETE USER EXPERIENCE
  public deletePreviousExperience(positionId, userId) {
    return this.http.delete(this.address + "/userProfile/" + userId + "/previousPositions/" + positionId);
  }

  //UPDATE USER EXPERIENCE
  public updatePreviousExperience(positionId, userId, updatedPosition) {
    return this.http.put(this.address + "/userProfile/" + userId + "/previousPositions/" + positionId, updatedPosition);
  }

  //RETRIEVE RELEVANT JOBS ACCORDING TO TAGS
  public searchForJobs(tagIds) {
    return this.http.post(this.address + "/search", {"tagIds": tagIds});
  }

  //RETRIEVE EMPLOYER NAME FROM EMPLOYER ID
  public getEmployerName(employerId) {
    return this.http.get(this.address + "/employers/" + employerId);
  }

  //LET A USER SAVE A JOB
  public saveJob(userId, jobInfo) {
    return this.http.post(this.address + "/userProfile/" + userId + "/applications/save", jobInfo);
  }

  //LET A USER UNSAVE A JOB
  public unsaveJob(userId, jobId) {
    return this.http.delete(this.address+  "/userProfile/" + userId + "/applications/" + jobId);
  }

  //GET ALL IN PROGRESS APPLICATIONS OF A USER
  public getSavedJobs(userId) {
    return this.http.get(this.address + "/userProfile/" + userId + "/savedApplications");
  }

  //GET ALL RECOMMENDED JOBS
  public getRecommendedJobs(userId) {
    return this.http.get(this.address + "/search/" + userId);
  }



}
