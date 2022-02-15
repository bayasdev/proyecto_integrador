import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  options = {};
  headers = {};
  
  constructor(private http: HttpClient) { }

  init(): void {
    this.headers = new HttpHeaders({'api_token': sessionStorage.getItem('token') as string});
    this.options = {headers: this.headers};
  }
  
  get(): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'users', this.options).toPromise();
  }
  
  create(identification: string, name: string, email: string, role: number): Promise<any> {
    this.init();
    const data = { identification: identification, name: name, email: email, role: role };
    return this.http.post(environment.api + 'users', data, this.options).toPromise();
  }

  update(id: number, identification: string, name: string, email: string, role: number): Promise<any> {
    this.init();
    const data = { identification: identification, name: name, email: email, role: role };
    return this.http.put(environment.api + 'users/'+id, data, this.options).toPromise();
  }
  
  updateProfile(id: number, email: string, password: string): Promise<any> {
    this.init();
    const data = { email: email, password: password };
    return this.http.put(environment.api + 'update-profile/'+id, data, this.options).toPromise();
  }
  
  delete(id: number): Promise<any> {
    this.init();
    return this.http.delete(environment.api + 'users/'+id, this.options).toPromise();
  }
}
