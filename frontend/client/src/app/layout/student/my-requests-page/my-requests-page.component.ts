import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestService } from 'src/app/services/request.service';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-requests-page',
  templateUrl: './my-requests-page.component.html',
  styleUrls: ['./my-requests-page.component.scss']
})
export class MyRequestsPageComponent implements OnInit {

  user: any = {};

  requests: any[] = []

  request_types = environment.request_types;

  request_statuses = environment.request_statuses;

  constructor(
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
    this.requestDataService.getByStudent(this.user.sub).then( r => {
      this.spinner.hide();
      this.requests = r;
    }).catch( e => { console.log(e) });
  }

}
