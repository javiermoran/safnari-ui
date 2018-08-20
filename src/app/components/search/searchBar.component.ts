import { Component, Input, Output, EventEmitter } from "@angular/core";


@Component({
  selector: 'app-search-bar',
  templateUrl: './searchBar.component.html',
})
export class SearchBarComponent {
  @Input() name: string;
  @Input() placeholder: string;
  @Input() total: number;
  @Output() onKeyUp = new EventEmitter<string>(); 
  @Output() addNew = new EventEmitter<void>();
  searchActive: Boolean = false;
  searchParam: string;

  isInputActive() {
    return this.searchParam || this.searchActive;
  }

  searchKeyup() {
    this.onKeyUp.emit(this.searchParam);
  }

  addNewClick() {
    this.addNew.emit();
  }
}