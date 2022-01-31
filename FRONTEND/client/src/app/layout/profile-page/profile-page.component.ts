import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  
  user: any = {};
  correo: string = '';
  password_confirm: string = '';
  new_password: string = '';
  password_min_length: number = 8;
  password_caracteres_numericos: boolean = true;
  password_caracteres_especiales: boolean = true;
  password_caracteres_mayusculas: boolean = true;
  password_caracteres_minusculas: boolean = true;
  
  errores: any[] = [];
  
  constructor(private spinner: NgxSpinnerService,
    private userDataService: UserService,
    private router: Router,
    private toastr: ToastrService) { }
    
    ngOnInit(): void {
      this.reset();
      this.correo = this.user.email;
    }
    
    reset() {
      this.password_confirm = '';
      this.new_password = '';
      const token: string = sessionStorage.getItem('token') as string;
      const decoded: any = jwt_decode(token);
      this.user = decoded;
    }
    
    validate_email(): boolean {
      this.errores = [];
      if (this.user.email == '') {
        this.errores.push( { title: 'Correo Electrónico Incorrecto', message: 'Debe ingresar un Correo Electrónico'} );
        return false;
      }
      const isOk = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email.toString());
      if (!isOk) {
        this.errores.push( { title: 'Correo Electrónico Incorrecto', message: 'Correo Electrónico no válido.'} );
      }
      return isOk;
    }
    
    validate_password(): boolean {
      if(this.new_password != this.password_confirm){
        this.errores.push( { title: 'Contraseña Incorrecta', message: 'Las contraseñas no coinciden.'} );
        return false;
      }
      else {
        return true;
      }
    }
    
    save_profile() {
      try {
        this.spinner.show();
        this.validate_email();
        this.validate_password();
        if (this.errores.length > 0) {
          this.spinner.hide();
          this.errores.forEach((error: any) => {
            this.toastr.error(error.message, error.title);
          });
          return;
        } else if (this.user.email == this.correo && this.new_password == '') {
          this.spinner.hide();
          this.toastr.info('Ningún cambio realizado.', 'Info');
          return;
        }
        if(this.new_password != ''){
          this.userDataService.update(this.user.sub, this.user.identification, this.user.name, this.user.email, undefined, this.new_password).then( r => {
            this.spinner.hide();
            this.toastr.success('Por favor inicie sesión nuevamente.', 'Perfil Actualizado');
            sessionStorage.clear();
            this.router.navigate(['/login']);
          }).catch( e => { console.log(e) });
        } else {
          this.userDataService.update(this.user.sub, this.user.identification, this.user.name, this.user.email).then( r => {
            this.spinner.hide();
            this.toastr.success('Por favor inicie sesión nuevamente.', 'Perfil Actualizado');
            sessionStorage.clear();
            this.router.navigate(['/login']);
          }).catch( e => { console.log(e) });
        }
      } catch (e: any) {
        this.toastr.error(e.error.error, 'Error');
      }
    }
  }
  