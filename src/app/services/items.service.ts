import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { Item } from "../models/item.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable()
export class ItemsService {
  private API_URI = `${environment.apiUrl}/items`;
  public itemAdded = new Subject<Item>();

  constructor(private httpClient: HttpClient) {}

  saveItem(item: Item) {
    return this.httpClient.post(this.API_URI, item);
  }

  getItems(collection: string) {
    return this.httpClient.get(`${this.API_URI}?collection=${collection}`);
  }
}