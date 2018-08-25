import { Component, Input, OnChanges, SimpleChanges, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ignoreElements } from "rxjs/operators";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  @Input() item;
  isFlipped: boolean = false;
  isTranslated: boolean = false;
  cardStyle;

  constructor() {}

  ngOnInit() {}

  backgroundImage(url) {
    return { 'background-image': `url(${url})` };
  }

  toggleFlipped() {
    this.isFlipped = !this.isFlipped;
  }

  toggleDetails() {
    this.isTranslated = !this.isTranslated;
    this.cardStyle = this.isTranslated ? {"background": "transparent"} : {};
  }
}
