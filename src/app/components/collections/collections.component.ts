import { Component, OnInit } from "@angular/core";
import { CollectionsService } from "../../services/collections.service";
import { Collection } from '../../models/collection.model';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html'
})
export class CollectionsComponent implements OnInit {
  public collections: [Collection] = null;

  constructor(private collectionsService: CollectionsService) {}

  ngOnInit() {
    this.getCollections();
  }

  getCollections() {
    this.collectionsService.getCollections()
      .subscribe((response) => {
        this.collections = response['data'];
      }, (error) => {
        console.log(error);
      });
  }
}
