import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  template: `<re-captcha
    (resolved)="resolved($event)"
    (error)="errored($event)"
    errorMode="handled"
  ></re-captcha>`,
})
export class LoginPageComponent implements OnInit {

  opcion_seleccionada: string = 'Autenticación';
  
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.spinner.hide();
  }

}
