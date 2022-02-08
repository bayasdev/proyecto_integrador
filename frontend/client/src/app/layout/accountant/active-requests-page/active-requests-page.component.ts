import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-active-requests-page',
  templateUrl: './active-requests-page.component.html',
  styleUrls: ['./active-requests-page.component.scss']
})
export class ActiveRequestsPageComponent implements OnInit {

  requests: any[] = []

  request_types = environment.request_types;

  request_statuses = environment.request_statuses;

  constructor(
    private spinner: NgxSpinnerService,
    private requestDataService: RequestService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.get_requests();
  }

  get_requests(){
    this.spinner.show();
    this.requests = [];
    this.requestDataService.getPendingPayment().then( r => {
      this.spinner.hide();
      this.requests = r;
    }).catch( e => { console.log(e) });
  }

}
