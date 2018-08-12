import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CollectionsService } from "../../../services/collections.service";
import { Collection } from "../../../models/collection.model";

@Component({
  selector: 'app-coll-form',
  templateUrl: './collectionForm.component.html'
})
export class CollectionFormComponent implements OnInit{
  public collForm: FormGroup;

  constructor(private collectionsService: CollectionsService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.collForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  saveCollection() {
    const { name } = this.collForm.value;
    const newColl = new Collection(name);

    this.collectionsService.saveCollection(newColl)
      .subscribe((response) => {
        const added = new Collection(response['name']);
        this.collectionsService.collectionAdded.next(added);
      }, (error) => {
        console.log(error);
      });
  }

}