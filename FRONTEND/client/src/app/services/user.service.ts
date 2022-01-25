import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  options = {};
  headers = {};

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'api_token': sessionStorage.getItem('token') as string});
    this.options = {headers: this.headers};
  }

  get(): Promise<any>{
    return this.http.get(environment.api + 'user', this.options).toPromise();
  }

  update(id: number, identification: string, name: string, email: string, role_id?: number): Promise<any> {
    const data = { id: id, identification: identification, name: name, email: email, role_id: role_id };
    return this.http.put(environment.api + 'user', JSON.stringify(data), this.options).toPromise();
  }
  
  change_password(id: number, password: string): Promise<any> {
    const data = { id: id, new_password: password };
    return this.http.post(environment.api + 'user/password_change', JSON.stringify(data), this.options).toPromise();
  }

  delete(id: number): Promise<any> {
    const data = { id: id };
    return this.http.delete(environment.api + 'user', {"body": JSON.stringify(data), "headers": this.headers}).toPromise();
  }
}
