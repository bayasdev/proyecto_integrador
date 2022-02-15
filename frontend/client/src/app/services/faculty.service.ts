import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  options = {};
  headers = {};

  constructor(private http: HttpClient) { }

  init(): void {
    this.headers = new HttpHeaders({'api_token': sessionStorage.getItem('token') as string});
    this.options = {headers: this.headers};
  }

  get(): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'faculties', this.options).toPromise();
  }

  create(name: string, dean_id: number): Promise<any> {
    this.init();
    const data = { name: name, dean_id: dean_id };
    return this.http.post(environment.api + 'faculties', data, this.options).toPromise();
  }

  update(id: number, name: string, dean_id: number): Promise<any> {
    this.init();
    const data = { id: id, name: name, dean_id: dean_id };
    return this.http.put(environment.api + 'faculties/'+id, data, this.options).toPromise();
  }

  delete(id: number): Promise<any> {
    this.init();
    return this.http.delete(environment.api + 'faculties/'+id, this.options).toPromise();
  }
}
