import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private base_url: string = '';

  constructor(private http: HttpClient) { }

  async consulta(url: String,method: String,body?: any): Promise<Observable<any>> {
    switch (method) {
      case 'get':
        return await this.http.get(this.base_url+url);
        break;

      case 'post':
        return await this.http.post(this.base_url+url, body);
        break;

      case 'patch':
        return await this.http.patch(this.base_url+url, body);
        break;

      case 'delete':
        return await this.http.delete(this.base_url+url);
        break;

      default:
        return await this.http.get(this.base_url+url);
        break;
    }
  }
}
