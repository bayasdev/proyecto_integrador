import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  users: any[] = [];
  new_user: any = {
    identification: '',
    name: '',
    email: '',
    role: 1,
  };
  selected_user: any = {};
  roles = [
    {
      id: 1,
      name: 'Administrador'
    },
    {
      id: 2,
      name: 'Decano'
    },
    {
      id: 3,
      name: 'Director de Carrera'
    },
    {
      id: 4,
      name: 'Contabilidad'
    },
    {
      id: 5,
      name: 'Estudiante'
    },
  ];
  isEditing: boolean = false;

  order: string = 'id';

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private userDataService: UserService, private authDataService: AuthService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.new_user.identification = '';
    this.new_user.name = '';
    this.new_user.email = '';
    this.new_user.role = 1;
    this.isEditing = false;
    this.get_users();
  }

  select_user(user: any) {
    this.selected_user = user;
  }

  get_users(){
    this.spinner.show();
    this.users = [];
    this.userDataService.get().then( r => {
      this.spinner.hide();
      this.users = r;
    }).catch( e => { console.log(e) });
  }

  create_user(){
    this.spinner.show();
    if (this.new_user.identification == '' || this.new_user.name == '' || this.new_user.email == '') {
      this.spinner.hide();
      this.toastr.error('La cédula, nombre y/o correo no pueden estar vacios.', 'Error');
      return;
    }
    if (!this.validate_email(this.new_user.email)){
      this.spinner.hide();
      this.toastr.error('El correo electrónico ingresado no es válido.', 'Error');
      return;
    }
    this.userDataService.create(this.new_user.identification, this.new_user.name, this.new_user.email, this.new_user.role).then( r => {
      this.spinner.hide();
      this.toastr.success('El usuario ha sido registrado correctamente.', 'Usuario Creado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  update_user(user: any){
    this.spinner.show();
    if (user.identification == '' || user.name == '' || user.email == ''){
      this.spinner.hide();
      this.toastr.error('La cédula, nombre y/o correo no pueden estar vacios.', 'Error');
      return;
    }
    if (!this.validate_email(user.email)){
      this.spinner.hide();
      this.toastr.error('El correo electrónico ingresado no es válido.', 'Error');
      return;
    }
    this.userDataService.update(user.id, user.identification, user.name, user.email, user.role).then( r => {
      this.spinner.hide();
      this.toastr.success('El usuario ha sido actualizado correctamente.', 'Usuario Actualizado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  delete_user(user: any){
    this.spinner.show();
    this.userDataService.delete(user.id).then( r => {
      this.spinner.hide();
      this.toastr.success('El usuario ha sido eliminado correctamente.', 'Usuario Eliminado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  reset_user_password(user: any){
    this.spinner.show();
    this.authDataService.password_recovery(user.email).then( r => {
      this.spinner.hide();
      this.toastr.success('Pida al usuario revisar su correo electrónico para continuar.', 'Solicitud de Restablecimiento Enviada');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  edit_user() {
    this.isEditing = !this.isEditing;
  }

  validate_email(email: string): boolean {
    const isOk = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.toString());
    return isOk;
  }

}
