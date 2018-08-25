import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit{
  num: number = 0;

  ngOnInit() {
    this.num = Math.random() * 10;
  }
}