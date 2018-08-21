import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CollectionsService } from "../../../services/collections.service";
import { Subscription } from "rxjs";
import { ItemsService } from "../../../services/items.service";
import { AlertsService } from "../../../services/alerts.service";
import { AlertModel } from "../../../models/alert.model";

@Component({
  selector: 'app-collection-details',
  templateUrl: './collectionDetails.component.html'
})
export class CollectionDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('editInput') inputEl: ElementRef;
  collection: any = {};
  items: any = [];
  filteredItems: any = [];
  addingItem: boolean = false;
  editingCollection: boolean = false;
  itemAdded: Subscription;
  id: string;
  collectionName: string;

  constructor(
    private route: ActivatedRoute,
    private collService: CollectionsService,
    private itemsService: ItemsService,
    private alertsService: AlertsService
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
        this.collectionName = this.collection.name;
      }, (error) => {
        console.log(error);
      })
  }

  getItems(collection: string) {
    this.itemsService.getItems(collection)
      .subscribe((res) => {
        this.items = res['data'];
        this.filterItems('');
      }, (err) => {
        console.log(err);
      })
  }

  toggleForm() {
    this.addingItem = !this.addingItem;
  }

  filterItems(param) {
    this.filteredItems = this.items.filter(
      (item) => {
        let search = item.title.toLowerCase();
        search += item.number;
        search += item.publisher.toLowerCase();

        return search.includes(param.toLowerCase());
      });
  }

  saveName() {
    this.editingCollection = !this.editingCollection;
    

    if(this.collection.name != this.collectionName) {
      const name = this.collection.name = this.collectionName;
      const id = this.collection._id
      this.collService.updateCollection(id, { name })
        .subscribe((result) => {
          const message = `Collection name changed to ${name}`;
          const alert = new AlertModel(message, 'success');
          this.alertsService.addAlert(alert);
        }, (e) => {
          console.log(e);
        })
    }
  }

  showEditing() {
    this.editingCollection = true;
    
    setTimeout(() => {
      this.inputEl.nativeElement.focus();
    }, 0);
  }

  cancel() {
    this.addingItem = false;
  }

  ngOnDestroy() {
    this.itemAdded.unsubscribe();
  }
}
