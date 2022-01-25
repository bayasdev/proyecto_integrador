import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  user: any = {};
  date = this.datepipe.transform(new Date(), 'dd/MM/yyyy');

  constructor(
    private datepipe: DatePipe,
  ) {  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user') as string);
  }

}
