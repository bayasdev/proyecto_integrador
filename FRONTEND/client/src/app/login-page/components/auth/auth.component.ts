import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @Output('opcion') opcion: EventEmitter<string> = new EventEmitter<string>();
  email: string = '';
  password: string = '';

  constructor( private authDataService: AuthService,
               private spinner: NgxSpinnerService,
               private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  change_page(opcion: string) {
    this.opcion.emit(opcion);
  }

  show_alert(title: string, message: string, icon: SweetAlertIcon): Promise<any> {
    return Swal.fire({
      title: title,
      html: message,
      icon: icon,
    });
  }

  login() {
    this.spinner.show();
    this.authDataService.login(this.email, this.password).then( r => {
      this.spinner.hide();
      sessionStorage.setItem('token', r.token);
      sessionStorage.setItem('user', JSON.stringify(r.user));
      this.router.navigate(['/dashboard']);
    }).catch( e => {
      this.spinner.hide();
      this.show_alert('Autenticación', 'Credenciales incorrectas', 'error').then( response => {
        this.email = '';
        this.password = '';
      });
    });
  }
}
