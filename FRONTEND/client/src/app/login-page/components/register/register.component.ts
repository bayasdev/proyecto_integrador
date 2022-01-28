import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output('opcion') opcion: EventEmitter<string> = new EventEmitter<string>();

  email: string = '';
  name: string = '';
  identification: string = '';

  errores: any[] = [];
  email_validated: boolean = false;

  constructor(private authDataService: AuthService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  change_page(opcion: string) {
    this.opcion.emit(opcion);
  }

  validate_email(): boolean {
    this.errores = [];
    this.email_validated = false;
    if (this.email == '') {
      this.errores.push( { title: 'Correo Electrónico Incorrecto', message: 'Debe ingresar el Correo Electrónico'} );
      this.email_validated = false;
      return false;
    }
    const isOk = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email.toString());
    if (!isOk) {
      this.errores.push( { title: 'Correo Electrónico Incorrecto', message: 'El Correo Electrónico no se encuentra escrito correctamente'} );
    }
    this.email_validated = isOk;
    return isOk;
  }

  show_alert(title: string, message: string, icon: SweetAlertIcon): Promise<any> {
    return Swal.fire({
      title: title,
      html: message,
      icon: icon,
    });
  }

  register() {
    this.validate_email();
    if (this.name == '') {
      this.errores.push( { title: 'Nombre Completo Incorrecto', message: 'Debe ingresar el Nombre Completo'} );
    }
    if (this.errores.length > 0) {
      this.errores.forEach((error: any) => {
        this.toastr.error(error.message, error.title);
      });
      return;
    }
    this.spinner.show();
    this.authDataService.register(this.email, this.identification, this.name).then( r => {
      this.spinner.hide();
      this.show_alert('Crear Cuenta', r, 'success').then( response => {
        this.change_page('Autenticación');
      });
    }).catch( e => {
      this.spinner.hide();
      this.show_alert('Crear Cuenta', e.error.message, 'error').then( response => {
        this.email = '';
        this.name = '';
        this.email_validated = false;
      });
    });
  }
}
