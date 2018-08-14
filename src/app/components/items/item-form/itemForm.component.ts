import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ItemsService } from "../../../services/items.service";
import { Item } from "../../../models/item.model";

@Component({
  selector: 'app-item-form',
  templateUrl: './itemForm.component.html'
})
export class ItemFormComponent implements OnInit {
  @Input() type: string;
  @Input() collection: string;
  @Output() cancel = new EventEmitter();
  itemForm:FormGroup;
  image: string;

  constructor(private itemService: ItemsService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.itemForm = new FormGroup({
      title: new FormControl('', Validators.required),
      number: new FormControl('', Validators.min(0)),
      publisher: new FormControl(''),
      format: new FormControl('')
    });
  }

  fileChange(event) {
    var file:File = event.target.files[0];
    var fileReader:FileReader = new FileReader();

    fileReader.onloadend = (e) => {
      this.image = fileReader.result;
    }
    fileReader.readAsDataURL(file);
  }

  submit() {
    const { title, number, publisher, format } = this.itemForm.value;

    const newItem = new Item(
      title, 
      number, 
      publisher, 
      format, 
      this.image, 
      this.type, 
      this.collection);

      this.itemService.saveItem(newItem)
        .subscribe((res: Item) => {
          this.itemService.itemAdded.next(res);
        }, (err) => {
          console.log(err);
        });
  }

  formCancel() {
    this.cancel.emit();
  }
}