import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Response } from "@angular/http";
import { StatisticsService } from "../../services/statistics.service";
import { BarGraphModel } from "../../graphs/bar/barGrap.model";

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  username: String;
  counts: { collections: number, items: number } = { collections: 0, items: 0 };
  typesGraphData: BarGraphModel[] = [];

  constructor(
    private userService: UserService,
    private statsService: StatisticsService
  ) { }

  ngOnInit() {
    this.getUserInfo();
    this.getStatisticsCount();
    this.getCollectionsItemCount();
  }

  getUserInfo() {
    this.userService.getMe()
      .subscribe((response) => {
        this.username = response['username'];
      }, (err) => {
        console.log(err);
      })
  }

  getStatisticsCount() {
    this.statsService.getCounts()
      .subscribe((response: any) => {
        const { collections, items } = response;
        this.counts = { collections, items };
      }, (err) => {
        console.log(err);
      })
  }

  getCollectionsItemCount() {
    this.statsService.getCollectionsItemCount()
      .subscribe((res: any) => {
        this.typesGraphData = res.map((type) => {
          return new BarGraphModel(
            type['description'],
            type['count'],
            'Type',
            'Count');
        });
      }, (err) => {
        console.log(err);
      })
  }


}
