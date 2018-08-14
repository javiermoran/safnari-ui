import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CollectionsService } from "../../../services/collections.service";
import { Subscription } from "rxjs";
import { ItemsService } from "../../../services/items.service";

@Component({
  selector: 'app-collection-details',
  templateUrl: './collectionDetails.component.html'
})
export class CollectionDetailsComponent implements OnInit, OnDestroy {
  collection = {};
  addingItem: boolean = false;
  itemAdded: Subscription;

  constructor(
    private route: ActivatedRoute,
    private collService: CollectionsService,
    private itemService: ItemsService
  ) {}

  ngOnInit() {
    this.collection['type'] = {}

    this.route.params.subscribe((params) => {
      this.getCollectionInfo(params.id);
    });

    this.itemAdded = this.itemService.itemAdded
      .subscribe(() => {
        this.addingItem = false;
      });
  }

  getCollectionInfo(id: String) {
    this.collService.getCollection(id)
      .subscribe((res) => {
        this.collection = res;
        this.addingItem = false;
      }, (error) => {
        console.log(error);
      })
  }

  cancel() {
    this.addingItem = false;
  }

  ngOnDestroy() {
    this.itemAdded.unsubscribe();
  }
}
