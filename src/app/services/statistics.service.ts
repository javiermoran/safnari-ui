import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class StatisticsService {
  private API_URI = `${environment.apiUrl}/statistics`;

  constructor(private httpClient: HttpClient) {}

  getCounts() {
    return this.httpClient.get(`${this.API_URI}/counts`);
  }

  getCollectionsTypeCount() {
    return this.httpClient.get(`${this.API_URI}/collections/types`);
  }

  getItemsTypeCount() {
    return this.httpClient.get(`${this.API_URI}/items/types`);
  }

  getItemsCollectionPct() {
    return this.httpClient.get(`${this.API_URI}/collections/items`);
  }
}