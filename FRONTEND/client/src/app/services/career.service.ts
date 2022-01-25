import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  options = {};
  headers = {};

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'api_token': sessionStorage.getItem('token') as string});
    this.options = {headers: this.headers};
  }

  get(): Promise<any>{
    return this.http.get(environment.api + 'career', this.options).toPromise();
  }

  create(name: string, director_id: number, faculty_id: number): Promise<any> {
    const data = { name: name, faculty_id: faculty_id, director_id: director_id };
    return this.http.post(environment.api + 'career', JSON.stringify(data), this.options).toPromise();
  }

  update(id: number, name: string, director_id: number, faculty_id: number): Promise<any> {
    const data = { id: id, name: name, faculty_id: faculty_id, director_id: director_id };
    return this.http.put(environment.api + 'career', JSON.stringify(data), this.options).toPromise();
  }

  delete(id: number): Promise<any> {
    const data = { id: id };
    return this.http.delete(environment.api + 'career', {"body": JSON.stringify(data), "headers": this.headers}).toPromise();
  }
}
