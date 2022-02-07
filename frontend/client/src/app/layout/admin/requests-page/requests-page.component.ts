import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services/request.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss']
})
export class RequestsPageComponent implements OnInit {

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
    this.requestDataService.get().then( r => {
      this.spinner.hide();
      this.requests = r;
    }).catch( e => { console.log(e) });
  }

  delete_request(id: number){
    this.spinner.show();
    this.requests = [];
    this.requestDataService.delete(id).then( r => {
      this.spinner.hide();
      this.toastr.success('Solciitud eliminada correctamente.', 'Solciitud Eliminada');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

}
