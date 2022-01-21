import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  options = {};

  constructor(private http: HttpClient) {
    const headers = new HttpHeaders({'api_token': sessionStorage.getItem('token') as string});
    this.options = {headers: headers};
  }

  get(): Promise<any>{
    return this.http.get(environment.api + 'user', this.options).toPromise();
  }

  create(name: string, email: string): Promise<any> {
    const data = { name: name, email: email};
    return this.http.post(environment.api + 'user', JSON.stringify(data), this.options).toPromise();
  }

  update(id: number, name: string, email: string): Promise<any> {
    const data = { id: id, name: name, email: email};
    return this.http.put(environment.api + 'user', JSON.stringify(data), this.options).toPromise();
  }
  
  change_password(id: number, password: string): Promise<any> {
    const data = { id: id, new_password: password };
    return this.http.post(environment.api + 'user/password_change', JSON.stringify(data), this.options).toPromise();
  }

  delete(id: number): Promise<any> {
    const data = { id: id };
    return this.http.delete(environment.api + 'user', {"body": JSON.stringify(data), "headers": this.options}).toPromise();
  }
}
