import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  options = {};
  headers = {};

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'api_token': sessionStorage.getItem('token') as string});
    this.options = {headers: this.headers};
  }

  get(): Promise<any>{
    return this.http.get(environment.api + 'director', this.options).toPromise();
  }

  create(name: string, identification: string): Promise<any> {
    const data = { name: name, identification: identification };
    return this.http.post(environment.api + 'director', JSON.stringify(data), this.options).toPromise();
  }

  update(id: number, name: string, identification: string): Promise<any> {
    const data = { id: id, name: name, identification: identification };
    return this.http.put(environment.api + 'director', JSON.stringify(data), this.options).toPromise();
  }

  delete(id: number): Promise<any> {
    const data = { id: id };
    return this.http.delete(environment.api + 'director', {"body": JSON.stringify(data), "headers": this.headers}).toPromise();
  }
}
