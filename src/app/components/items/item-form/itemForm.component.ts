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
  @Input() item: Item;
  @Output() cancel = new EventEmitter();
  id: string;
  editing: boolean;
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

  ngOnInit() {}

  initForm(item: any) {
    const title = item ? item.title || '' : '';
    const number = item ? item.number || '' : '';
    const publisher = item ? item.publisher || '' : '';
    const artist = item ? item.artist || '' : '';
    const format = item ? item.format || '' : '';

    this.itemForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      number: new FormControl(number, Validators.min(0)),
      publisher: new FormControl(publisher),
      artist: new FormControl(artist),
      format: new FormControl(format)
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

    let observable = !this.editing ? this.itemService.saveItem(newItem) 
          : this.itemService.updateItem(newItem, this.id)
    
    observable.subscribe((res: Item) => {
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

    if(changes.hasOwnProperty('item')) {
      const current = changes.item.currentValue;
      this.id = current ? current._id : '';
      this.editing = current ? true : false;
      this.initForm(current);
    }
  }
}