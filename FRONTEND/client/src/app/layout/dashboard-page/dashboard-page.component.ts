import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import jwt_decode from "jwt-decode";

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
    const token: string = sessionStorage.getItem('token') as string;
    const decoded: any = jwt_decode(token);
    this.user = decoded;
  }

}
