import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Collection } from "../models/collection.model";
import { Subject } from "rxjs";

@Injectable()
export class CollectionsService {
  private API_URI = `${environment.apiUrl}/collections`;
  public collectionAdded = new Subject<Collection>();

  constructor(private httpClient: HttpClient) {}

  getCollections() {
    return this.httpClient.get(this.API_URI);
  }

  saveCollection(collection: Collection) {
    return this.httpClient.post(this.API_URI, collection);
  }
}