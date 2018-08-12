import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CollectionsService } from "../../../services/collections.service";
import { Collection } from "../../../models/collection.model";
import { TypesService } from "../../../services/types.service";

@Component({
  selector: 'app-coll-form',
  templateUrl: './collectionForm.component.html'
})
export class CollectionFormComponent implements OnInit{
  @Output() cancel = new EventEmitter();
  collForm: FormGroup;
  types: [{}];

  constructor(
    private collectionsService: CollectionsService,
    private typesService: TypesService
  ) {}

  ngOnInit() {
    this.getTypes();
    this.initForm();
  }

  initForm() {
    this.collForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });
  }

  saveCollection() {
    const { name, type } = this.collForm.value;
    const newColl = new Collection(name, type);

    this.collectionsService.saveCollection(newColl)
      .subscribe((response) => {
        const added = new Collection(response['name'], response['type']);
        this.collectionsService.collectionAdded.next(added);
      }, (error) => {
        console.log(error);
      });
  }

  cancelForm() {
    this.cancel.emit();
  }

  getTypes() {
    this.typesService.getTypes()
      .subscribe((response) => {
        this.types = response['data'];
        this.initForm();
      }, (error) => {
        console.log(error);
      });
  }

}