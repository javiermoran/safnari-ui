import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { ignoreElements } from "rxjs/operators";
import { Item } from "../../../models/item.model";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Output() editClick = new EventEmitter<Item>();
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

  edit() {
    this.editClick.emit(this.item);
  }
}
