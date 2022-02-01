import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  options: any = {};

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Promise<any> {
    const data = { email: email, password: password };
    return this.http.post(environment.api + 'login', data).toPromise();
  }

  register(email: string, identification: string, name: string, role?: number): Promise<any> {
    const data = { email: email, identification: identification, name: name, role: role };
    return this.http.post(environment.api + 'register', data).toPromise();
  }

  password_recovery(email: string): Promise<any> {
    const data = { email: email };
    return this.http.post(environment.api + 'recovery_request', data).toPromise();
  }

  password_recovery_confirm(token: string): Promise<any> {
    return this.http.get(environment.api + 'recovery?r=' + token).toPromise();
  }
}
