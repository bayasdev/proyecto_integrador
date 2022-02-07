import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestService } from 'src/app/services/request.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-my-requests-page',
  templateUrl: './my-requests-page.component.html',
  styleUrls: ['./my-requests-page.component.scss']
})
export class MyRequestsPageComponent implements OnInit {

  user: any = {};

  requests: any[] = []

  request_types = [
    {
      id: 1,
      name: 'Modificación de Carga Académica'
    },
    {
      id: 2,
      name: 'Retiro en Asignatura'
    },
  ]

  request_statuses = [
    {
      id: 1,
      name: 'Pago Pendiente'
    },
    {
      id: 2,
      name: 'Pago Aprobado'
    },
    {
      id: 3,
      name: 'Pago Rechazado'
    },
    {
      id: 4,
      name: 'Aprobado por Director'
    },
    {
      id: 5,
      name: 'Rechazado por Director'
    },
    {
      id: 6,
      name: 'Aprobado por Decano'
    },
    {
      id: 7,
      name: 'Rechazado por Decano'
    },
  ]

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
