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
  collection: any = {};
  items: any = [];
  addingItem: boolean = false;
  itemAdded: Subscription;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private collService: CollectionsService,
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    this.collection['type'] = {}

    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.getCollectionInfo(params.id);
      this.getItems(params.id);
    });

    this.itemAdded = this.itemsService.itemAdded
      .subscribe((item) => {
        this.addingItem = false;
        this.getItems(this.id);
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

  getItems(collection: string) {
    this.itemsService.getItems(collection)
      .subscribe((res) => {
        this.items = res['data'];
      }, (err) => {
        console.log(err);
      })
  }

  cancel() {
    this.addingItem = false;
  }

  ngOnDestroy() {
    this.itemAdded.unsubscribe();
  }
}
