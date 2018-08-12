import { Component, OnInit, OnDestroy } from "@angular/core";
import { CollectionsService } from "../../services/collections.service";
import { Collection } from '../../models/collection.model';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html'
})
export class CollectionsComponent implements OnInit, OnDestroy {
  private collectionAdded: Subscription;
  collections: [Collection] = null;
  total: Number;
  addingCollection: Boolean = false;

  constructor(private collectionsService: CollectionsService) {}

  ngOnInit() {
    this.getCollections();

    this.collectionAdded = this.collectionsService.collectionAdded
      .subscribe((collection) => {
        this.addingCollection = false;
        this.collections.push(collection);
      });
  }

  getCollections() {
    this.collectionsService.getCollections()
      .subscribe((response) => {
        this.collections = response['data'];
        this.total = response['total'];
      }, (error) => {
        console.log(error);
      });
  }

  toggleForm() {
    this.addingCollection = !this.addingCollection;
  }

  ngOnDestroy() {
    this.collectionAdded.unsubscribe();
  }
}
