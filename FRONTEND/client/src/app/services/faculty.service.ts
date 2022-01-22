import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  options = {};
  headers = {};

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'api_token': sessionStorage.getItem('token') as string});
    this.options = {headers: this.headers};
  }

  get(): Promise<any>{
    return this.http.get(environment.api + 'faculty', this.options).toPromise();
  }

  create(name: string, dean_id: number): Promise<any> {
    const data = { name: name, dean_id: dean_id };
    return this.http.post(environment.api + 'faculty', JSON.stringify(data), this.options).toPromise();
  }

  update(id: number, name: string, dean_id: number): Promise<any> {
    const data = { id: id, name: name, dean_id: dean_id };
    return this.http.put(environment.api + 'faculty', JSON.stringify(data), this.options).toPromise();
  }

  delete(id: number): Promise<any> {
    const data = { id: id };
    return this.http.delete(environment.api + 'faculty', {"body": JSON.stringify(data), "headers": this.headers}).toPromise();
  }
}
