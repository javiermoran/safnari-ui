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

  getCollectionsItemCount() {
    return this.httpClient.get(`${this.API_URI}/collections/types`);
  }
}