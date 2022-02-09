import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services/request.service';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss']
})
export class RequestsPageComponent implements OnInit {

  user: any = {};

  requests: any[] = []

  request_types = environment.request_types;

  request_statuses = environment.request_statuses;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private requestDataService: RequestService
  ) { }

  ngOnInit(): void {
    const token: string = sessionStorage.getItem('token') as string;
    this.user = jwt_decode(token);
    this.refresh();
  }

  refresh(){
    this.get_requests();
  }

  get_requests(){
    this.spinner.show();
    this.requests = [];
    if (this.user.role == 1 || this.user.role == 4){
      this.requestDataService.get().then( r => {
        this.spinner.hide();
        this.requests = r;
      }).catch( e => { console.log(e) });
    } else if (this.user.role == 3) {
      this.requestDataService.getByDirector(this.user.sub).then( r => {
        this.spinner.hide();
        this.requests = r;
      }).catch( e => { console.log(e) });
    } else if (this.user.role == 2){
      this.requestDataService.getByDean(this.user.sub).then( r => {
        this.spinner.hide();
        this.requests = r;
      }).catch( e => { console.log(e) });
    }
  }

  delete_request(id: number){
    this.spinner.show();
    this.requests = [];
    this.requestDataService.delete(id).then( r => {
      this.spinner.hide();
      this.toastr.success('Solicitud eliminada correctamente.', 'Solicitud Eliminada');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

}
