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

  update(id: number, name: string, email: string): Promise<any> {
    const data = { id: id, name: name, email: email};
    return this.http.put(environment.api + 'user', JSON.stringify(data), this.options).toPromise();
  }
  
  change_password(id: number, password: string): Promise<any> {
    const data = { id: id, new_password: password };
    return this.http.post(environment.api + 'user/password_change', JSON.stringify(data), this.options).toPromise();
  }
}
