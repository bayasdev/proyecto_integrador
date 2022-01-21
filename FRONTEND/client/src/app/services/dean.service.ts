import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeanService {
  options = {};

  constructor(private http: HttpClient) {
    const headers = new HttpHeaders({'api_token': sessionStorage.getItem('token') as string});
    this.options = {headers: headers};
  }

  get(): Promise<any>{
    return this.http.get(environment.api + 'dean', this.options).toPromise();
  }

  create(name: string, identification: string): Promise<any> {
    const data = { name: name, identification: identification };
    return this.http.post(environment.api + 'dean', JSON.stringify(data), this.options).toPromise();
  }

  update(id: number, name: string, identification: string): Promise<any> {
    const data = { id: id, name: name, identification: identification };
    return this.http.put(environment.api + 'dean', JSON.stringify(data), this.options).toPromise();
  }

  delete(id: number): Promise<any> {
    const data = { id: id };
    return this.http.delete(environment.api + 'dean', {"body": JSON.stringify(data), "headers": this.options}).toPromise();
  }
}
