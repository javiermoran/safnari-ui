import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CollectionsService } from "../../../services/collections.service";
import { Collection } from '../../../models/collection.model';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collectionDetails.component.html'
})
export class CollectionDetailsComponent implements OnInit {
  collection;

  constructor(
    private route: ActivatedRoute,
    private collService: CollectionsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getCollectionInfo(params.id);
    })
  }

  getCollectionInfo(id: String) {
    this.collService.getCollection(id)
      .subscribe((res) => {
        this.collection = res;
      }, (error) => {
        console.log(error);
      })
  }
}
