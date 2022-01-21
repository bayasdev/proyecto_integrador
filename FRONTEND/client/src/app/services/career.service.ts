import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  options = {};

  constructor(private http: HttpClient) {
    const headers = new HttpHeaders({'api_token': sessionStorage.getItem('token') as string});
    this.options = {headers: headers};
  }

  get(): Promise<any>{
    return this.http.get(environment.api + 'carreer', this.options).toPromise();
  }

  create(name: string, faculty_id: number, director_id: number): Promise<any> {
    const data = { name: name, faculty_id: faculty_id, director_id: director_id };
    return this.http.post(environment.api + 'carreer', JSON.stringify(data), this.options).toPromise();
  }

  update(id: number, name: string, faculty_id: number, director_id: number): Promise<any> {
    const data = { id: id, name: name, faculty_id: faculty_id, director_id: director_id };
    return this.http.put(environment.api + 'carreer', JSON.stringify(data), this.options).toPromise();
  }

  delete(id: number): Promise<any> {
    const data = { id: id };
    return this.http.delete(environment.api + 'carreer', {"body": JSON.stringify(data), "headers": this.options}).toPromise();
  }
}
