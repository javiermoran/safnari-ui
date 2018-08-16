import { Component, Input, OnChanges, SimpleChanges, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ignoreElements } from "rxjs/operators";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  @Input() item;

  constructor() {}

  ngOnInit() {}

}
