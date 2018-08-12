import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class TypesService {
  private API_URI = `${environment.apiUrl}/types`;

  constructor(private httpClient: HttpClient) {}

  getTypes() {
    return this.httpClient.get(this.API_URI);
  }
}