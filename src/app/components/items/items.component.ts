import { Component, Input, OnChanges, SimpleChanges, OnDestroy, OnInit } from "@angular/core";
import { ItemsService } from "../../services/items.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() collection;
  @Input() type;
  items = [];
  itemAdded: Subscription; 

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.itemAdded = this.itemsService.itemAdded
      .subscribe((item) => {
        this.items.push(item);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.collection.currentValue) {
      this.getItems(changes.collection.currentValue);
    }
  }

  getItems(collection: string) {
    this.itemsService.getItems(collection)
      .subscribe((res) => {
        this.items = res['data'];
      }, (err) => {
        console.log(err);
      })
  }

  ngOnDestroy() {
    this.itemAdded.unsubscribe();
  }
}