import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private base_url: string = 'http://10.200.40.71:8000/api/';//'http://18.189.173.243/api/';//

  constructor(private http: HttpClient) { }

  async consulta(url: String,method: String,body?: any): Promise<any> {
    switch (method) {
      case 'get':
        return await this.http.get(this.base_url+url).toPromise();
        break;

      case 'post':
        return await this.http.post(this.base_url+url, body).toPromise();
        break;

      case 'patch':
        return await this.http.patch(this.base_url+url, body).toPromise();
        break;

      case 'delete':
        return await this.http.delete(this.base_url+url).toPromise();
        break;

      default:
        return await this.http.get(this.base_url+url).toPromise();
        break;
    }
  }
}
