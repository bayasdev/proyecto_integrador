import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestAttachmentService {
  options = {};
  headers = {};

  constructor(private http: HttpClient) { }

  init(): void {
    this.headers = new HttpHeaders({'api_token': sessionStorage.getItem('token') as string});
    this.options = {headers: this.headers};
  }

  getById(id: number): Promise<any> {
    this.init();
    return this.http.get(environment.api + 'request-attachments/'+id, this.options).toPromise();
  }

  create(file_name: string, file_type: string, file_content: any, attachment_type: number): Promise<any> {
    this.init();
    let data: any = { file_name: file_name, file_type: file_type, file_content: file_content, attachment_type: attachment_type };
    return this.http.post(environment.api + 'request-attachments', data, this.options).toPromise();
  }

}
