import { Component, OnInit } from '@angular/core';
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

  opcion_seleccionada: string = 'Iniciar Sesión';
  
  constructor() { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

}
