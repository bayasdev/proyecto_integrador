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

  cedula_validada: boolean = false;

  captcha: any;

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

  validar_cedula() {
    if(this.identification.length == 10){
        
      //Obtenemos el digito de la region que sonlos dos primeros digitos
      let digito_region = this.identification.substring(0,2);
      
      //Pregunto si la region existe ecuador se divide en 24 regiones
      if( Number(digito_region) >= 1 && Number(digito_region) <=24 ){
        
        // Extraigo el ultimo digito
        let ultimo_digito   = this.identification.substring(9,10);

        //Agrupo todos los pares y los sumo
        let pares = parseInt(this.identification.substring(1,2)) + parseInt(this.identification.substring(3,4)) + parseInt(this.identification.substring(5,6)) + parseInt(this.identification.substring(7,8));

        //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let numero1: any = this.identification.substring(0,1);
        numero1 = (numero1 * 2);
        if( numero1 > 9 ){ numero1 = (numero1 - 9); }

        let numero3: any = this.identification.substring(2,3);
        numero3 = (numero3 * 2);
        if( numero3 > 9 ){ numero3 = (numero3 - 9); }

        let numero5: any = this.identification.substring(4,5);
        numero5 = (numero5 * 2);
        if( numero5 > 9 ){ numero5 = (numero5 - 9); }

        let numero7: any = this.identification.substring(6,7);
        numero7 = (numero7 * 2);
        if( numero7 > 9 ){ numero7 = (numero7 - 9); }

        let numero9: any = this.identification.substring(8,9);
        numero9 = (numero9 * 2);
        if( numero9 > 9 ){ numero9 = (numero9 - 9); }

        let impares = numero1 + numero3 + numero5 + numero7 + numero9;

        //Suma total
        let suma_total = (pares + impares);

        //extraemos el primero digito
        let primer_digito_suma = String(suma_total).substring(0,1);

        //Obtenemos la decena inmediata
        let decena = (parseInt(primer_digito_suma) + 1)  * 10;

        //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digito_validador = decena - suma_total;

        //Si el digito validador es = a 10 toma el valor de 0
        if(digito_validador == 10)
          digito_validador = 0;

        //Validamos que el digito validador sea igual al de la this.identification
        if(Number(digito_validador) == Number(ultimo_digito)){
          this.cedula_validada = true;
        }else{
          this.cedula_validada = false;
          this.errores.push( { title: 'Cédula Incorrecta', message: 'El número de cédula ingresado no es válido.'} );
        }
        
      }else{
        // imprimimos en consola si la region no pertenece
        this.cedula_validada = false;
        this.errores.push( { title: 'Cédula Incorrecta', message: 'El número de cédula ingresado no pertenece a ninguna provincia.'} );
      }
   }else{
      //imprimimos en consola si la this.identification tiene mas o menos de 10 digitos
      this.cedula_validada = false;
      this.errores.push( { title: 'Cédula Incorrecta', message: 'El número de cédula ingresado no es válido.'} );
   }    
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
    this.validar_cedula();
    if (this.name == '') {
      this.errores.push( { title: 'Nombre Completo Incorrecto', message: 'Debe ingresar el Nombre Completo'} );
    }
    if(this.captcha == undefined || this.captcha == null){
      this.errores.push( { title: 'Captcha Incorrecto', message: 'Debe completar el Captcha'} );
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
      this.show_alert('Crear Cuenta', r.message, 'success').then( response => {
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
