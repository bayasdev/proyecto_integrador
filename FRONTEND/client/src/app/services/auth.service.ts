import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  options: any = {};

  constructor(private http: HttpClient) { }

  build_headers() {
    let headers: HttpHeaders = new HttpHeaders().set('token', sessionStorage.getItem('token') as string)
    this.options = {headers: headers};
  }

  login(email: string, password: string): Promise<any> {
    const data = { email: email, password: password };
    return this.http.post(environment.api + 'login', JSON.stringify(data)).toPromise();
  }

  register(email: string, name: string): Promise<any> {
    const data = { email: email, name: name };
    return this.http.post(environment.api + 'register', JSON.stringify(data)).toPromise();
  }

  password_recovery(email: string): Promise<any> {
    const data = { email: email };
    return this.http.post(environment.api + 'recovery', JSON.stringify(data)).toPromise();
  }

  update_user_data(id: number, email: string, name: string): Promise<any> {
    this.build_headers();
    const data = { id: id, email: email, name: name };
    return this.http.post(environment.api + 'admin/users/update_user_data', JSON.stringify(data)).toPromise();
  }
}
