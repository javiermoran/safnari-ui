import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Response } from "@angular/http";

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  username: String;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getMe()
      .subscribe((response) => {
        this.username = response['username'];
      }, (err) => {
        console.log(err);
      })
  }
}
