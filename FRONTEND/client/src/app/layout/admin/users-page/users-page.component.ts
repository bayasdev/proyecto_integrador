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
    name: '',
    email: ''
  };
  selected_user: any = {};
  isEditing: boolean = false;

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private userDataService: UserService, private authDataService: AuthService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.new_user.name = '';
    this.new_user.email = '';
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
    if (this.new_user.name == '' || this.new_user.email == '') {
      this.spinner.hide();
      this.toastr.error('El nombre y/o correo no pueden estar vacios.', 'Error');
      return;
    }
    this.authDataService.register(this.new_user.email, this.new_user.name).then( r => {
      this.spinner.hide();
      this.toastr.success('El usuario ha sido registrado correctamente.', 'Usuario Creado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  update_user(user: any){
    this.spinner.show();
    this.userDataService.update(user.id, user.name, user.email).then( r => {
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

}
