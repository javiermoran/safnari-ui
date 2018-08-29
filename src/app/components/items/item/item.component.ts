import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { ignoreElements } from "rxjs/operators";
import { Item } from "../../../models/item.model";
import { ItemsService } from "../../../services/items.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Input() id: string;
  @Output() editClick = new EventEmitter<Item>();
  isFlipped: boolean = false;
  isTranslated: boolean = false;
  cardStyle;

  constructor(private itemService: ItemsService) {}

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

  delete() {
    const del = confirm('Are you sure you want to delete the item?');
    if(del) {
      this.itemService.deleteItem(this.id)
        .subscribe(() => {
          this.itemService.itemAdded.next();
        }, (err) => {
          console.log(err);
        })
    }
  }

  edit() {
    this.editClick.emit(this.item);
  }
}
