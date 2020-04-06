import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],

})
export class MainViewComponent implements OnInit {
loggedIn: boolean;
userId: string;

  constructor() {
  }

  ngOnInit() {
    this.loggedIn = false;
  }

  logUserIn(event) {
    this.userId = event[0].userId;
    this.loggedIn = true;
  }

}
