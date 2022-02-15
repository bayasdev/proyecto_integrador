import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  options = {};
  headers = {};

  constructor(private http: HttpClient) { }

  init(): void {
    this.headers = new HttpHeaders({'api_token': sessionStorage.getItem('token') as string});
    this.options = {headers: this.headers};
  }

  get(): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'subjects', this.options).toPromise();
  }

  getByCareer(id: number): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'careers/'+id+'/subjects', this.options).toPromise();
  }

  create(name: string, code: string, credits: number, career_id: string): Promise<any> {
    this.init();
    const data = { name: name, code: code, credits: credits, career_id: career_id };
    return this.http.post(environment.api + 'subjects', data, this.options).toPromise();
  }

  update(id: number, name: string, code: string, credits: number, career_id: string): Promise<any> {
    this.init();
    
    const data = { id: id, name: name, code: code, credits: credits, career_id: career_id };
    return this.http.put(environment.api + 'subjects/'+id, data, this.options).toPromise();
  }

  delete(id: number): Promise<any> {
    this.init();
    return this.http.delete(environment.api + 'subjects/'+id, this.options).toPromise();
  }
}
