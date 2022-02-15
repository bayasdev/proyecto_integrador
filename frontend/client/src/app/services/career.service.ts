import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  options = {};
  headers = {};

  constructor(private http: HttpClient) { }

  init(): void {
    this.headers = new HttpHeaders({'api_token': sessionStorage.getItem('token') as string});
    this.options = {headers: this.headers};
  }

  get(): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'careers', this.options).toPromise();
  }

  create(name: string, director_id: number, faculty_id: number): Promise<any> {
    this.init();
    const data = { name: name, faculty_id: faculty_id, director_id: director_id };
    return this.http.post(environment.api + 'careers', data, this.options).toPromise();
  }

  update(id: number, name: string, director_id: number, faculty_id: number): Promise<any> {
    this.init();
    const data = { id: id, name: name, faculty_id: faculty_id, director_id: director_id };
    return this.http.put(environment.api + 'careers/'+id, data, this.options).toPromise();
  }

  delete(id: number): Promise<any> {
    this.init();
    return this.http.delete(environment.api + 'careers/'+id, this.options).toPromise();
  }
}
