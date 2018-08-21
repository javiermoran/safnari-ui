import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ItemsService } from "../../../services/items.service";
import { Item } from "../../../models/item.model";

@Component({
  selector: 'app-item-form',
  templateUrl: './itemForm.component.html'
})
export class ItemFormComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() collection: string;
  @Input() typeName: string;
  @Output() cancel = new EventEmitter();
  itemForm:FormGroup;
  image: any;
  form: any = {
    title: true,
    number: true,
    publisher: true,
    artist: true,
    format: true
  };
  formTypes: any = {
    title: 'book|cbook|bgame|toy|vgame|record|movie',
    number: 'cbook',
    publisher: 'book|cbook|bgame|toy|vgame|record|movie',
    artist: 'book|cbook|record|movie',
    format: 'book|cbook|vgame|record|movie'
  };

  constructor(private itemService: ItemsService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.itemForm = new FormGroup({
      title: new FormControl('', Validators.required),
      number: new FormControl('', Validators.min(0)),
      publisher: new FormControl(''),
      artist: new FormControl(''),
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
    const val = this.itemForm.value;
    const { title, number, publisher, artist, format } = val;

    const newItem = new Item(
      title, 
      number, 
      publisher, 
      artist,
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

  ngOnChanges(changes: SimpleChanges) {
    if(changes.typeName.currentValue) {
      const type = changes.typeName.currentValue;
      const types = this.formTypes;
      
      this.form.title = types.title.indexOf(type) !== -1;
      this.form.number = types.number.indexOf(type) !== -1;
      this.form.publisher = types.publisher.indexOf(type) !== -1;
      this.form.artist = types.artist.indexOf(type) !== -1;
      this.form.format = types.format.indexOf(type) !== -1;
    }
  }
}