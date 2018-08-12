import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class CollectionsService {
  private API_URI = `${environment.apiUrl}/collections`;

  constructor(private httpClient: HttpClient) {}

  getCollections() {
    return this.httpClient.get(this.API_URI);
  }
}