import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  options = {};
  headers = {};

  constructor(private http: HttpClient) { }

  init(): void {
    this.headers = new HttpHeaders({'api_token': sessionStorage.getItem('token') as string});
    this.options = {headers: this.headers};
  }

  get(): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'requests', this.options).toPromise();
  }

  getById(id: number): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'requests/'+id, this.options).toPromise();
  }

  getByStudent(id: number): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'students/'+id+'/requests', this.options).toPromise();
  }

  getActiveByStudent(id: number): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'students/'+id+'/requests/active', this.options).toPromise();
  }

  getPendingPayment(): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'accountants/requests/active', this.options).toPromise();
  }

  getByDirector(id: number): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'directors/'+id+'/requests', this.options).toPromise();
  }

  getActiveByDirector(id: number): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'directors/'+id+'/requests/active', this.options).toPromise();
  }

  getByDean(id: number): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'deans/'+id+'/requests', this.options).toPromise();
  }

  getActiveByDean(id: number): Promise<any>{
    this.init();
    return this.http.get(environment.api + 'deans/'+id+'/requests/active', this.options).toPromise();
  }

  create(student_id: number, career_id: number, request_type: number, parameters: any, attachment_id: number, subjects: any): Promise<any> {
    this.init();
    let selectedSubjects: any[] = [];
    subjects.forEach((subject: any) => {
      selectedSubjects.push(subject.id);
    });
    let data: any = { student_id: student_id, career_id: career_id, request_type: request_type, parameters: JSON.stringify(parameters), attachment_id: attachment_id, subject_id: selectedSubjects };
    return this.http.post(environment.api + 'requests', data, this.options).toPromise();
  }

  update(id: number, request_status: number, parameters: any, attachment_id?: number): Promise<any> {
    this.init();
    const data = { request_status: request_status, parameters: JSON.stringify(parameters), attachment_id: attachment_id };
    return this.http.put(environment.api + 'requests/'+id, data, this.options).toPromise();
  }

  delete(id: number): Promise<any> {
    this.init();
    return this.http.delete(environment.api + 'requests/'+id, this.options).toPromise();
  }
}
