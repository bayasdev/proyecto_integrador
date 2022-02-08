import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import jwt_decode from "jwt-decode";
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  user: any = {};
  date = this.datepipe.transform(new Date(), 'dd/MM/yyyy');

  requests: any[] = []

  request_types = environment.request_types;

  request_statuses = environment.request_statuses;

  constructor(
    private datepipe: DatePipe,
    private spinner: NgxSpinnerService,
    private requestDataService: RequestService
  ) {  }

  ngOnInit(): void {
    const token: string = sessionStorage.getItem('token') as string;
    this.user = jwt_decode(token);
    this.refresh();
  }

  refresh() {
    this.getActiveRequests();
  }

  getActiveRequests(){
    this.spinner.show();
    this.requests = [];
    if (this.user.role == 5){
      this.requestDataService.getActiveByStudent(this.user.sub).then( r => {
        this.spinner.hide();
        this.requests = r;
      }).catch( e => { console.log(e) });
    } else if (this.user.role == 4){
      this.requestDataService.getPendingPayment().then( r => {
        this.spinner.hide();
        this.requests = r;
      }).catch( e => { console.log(e) });
    } else if (this.user.role == 3){
      this.requestDataService.getActiveByDirector(this.user.sub).then( r => {
        this.spinner.hide();
        this.requests = r;
      }).catch( e => { console.log(e) });
    } else if (this.user.role == 2){
      this.requestDataService.getActiveByDean(this.user.sub).then( r => {
        this.spinner.hide();
        this.requests = r;
      }).catch( e => { console.log(e) });
    } else {
      // 
    }
  }

}
