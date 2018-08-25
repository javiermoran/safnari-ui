import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Response } from "@angular/http";
import { StatisticsService } from "../../services/statistics.service";
import { BarGraphModel } from "../../graphs/bar/barGrap.model";
import { PctGraphModel } from "../../graphs/pct/pctGraph.model";

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  username: String;
  counts: { collections: number, items: number } = { collections: 0, items: 0 };
  typesGraphData: BarGraphModel[] = [];
  itemTypesGraphData: BarGraphModel[] = [];
  itemsCollectionsData: PctGraphModel[] = [];
  isPctGraph: boolean = true;
  colorRange: string[] = ['#2DB8D8', '#1EA0B8', '#1D778C', '#186172', '#10414C'];
  rColorRange: string[] = [];

  constructor(
    private userService: UserService,
    private statsService: StatisticsService
  ) { }

  ngOnInit() {
    this.rColorRange = this.colorRange.reverse()
    this.getUserInfo();
    this.getStatisticsCount();
    this.getCollectionsTypeCount();
    this.getItemTypeCount();
    this.getItemsCollectionPct();
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

  getCollectionsTypeCount() {
    this.statsService.getCollectionsTypeCount()
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

  getItemTypeCount() {
    this.statsService.getItemsTypeCount()
      .subscribe((res: any) => {
        this.itemTypesGraphData = res.data.map((type) => {
          let pct: any = (type.count / res.total ) * 100;
          pct = Math.round(pct);
          return new PctGraphModel(
            type['description'],
            type['count'],
            pct
          );
        }).sort((a, b) => {
          if(a.percentage == b.percentage) return 0;
          return (a.percentage > b.percentage) ? 1 : -1;
        })
      }, (err) => {
        console.log(err);
      })
  }

  getItemsCollectionPct() {
    this.statsService.getItemsCollectionPct()
      .subscribe((res: any) => {
        this.itemsCollectionsData = res.data.map((collection) => {
          return new BarGraphModel(
            collection['name'],
            collection['count'],
            'Type',
            'Count'
          )
        });
      }, (err) => {
        console.log(err);
      });
  }

}
