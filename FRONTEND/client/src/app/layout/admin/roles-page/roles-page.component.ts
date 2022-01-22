import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.scss']
})
export class RolesPageComponent implements OnInit {
  roles: any[] = [];
  new_role_name: string = '';
  selected_role: any = {};
  isEditing: boolean = false;

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private rolDataService: RolService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.new_role_name = '';
    this.isEditing = false;
    this.get_roles();
  }

  select_role(role: any) {
    this.selected_role = role;
  }

  get_roles(){
    this.spinner.show();
    this.roles = [];
    this.rolDataService.get().then( r => {
      this.spinner.hide();
      this.roles = r;
    }).catch( e => { console.log(e) });
  }

  create_role(){
    this.spinner.show();
    if (this.new_role_name == null) {
      this.toastr.error('El nombre del rol no puede ser vacio.', 'Rol Inválido');
      return;
    }
    this.rolDataService.create(this.new_role_name).then( r => {
      this.spinner.hide();
      this.toastr.success('El rol ha sido guardado correctamente.', 'Rol Guardado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  update_role(role: any){
    this.spinner.show();
    this.rolDataService.update(role.id, role.name).then( r => {
      this.spinner.hide();
      this.toastr.success('El rol ha sido actualizado correctamente.', 'Rol Actualizado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  delete_role(role: any){
    this.spinner.show();
    this.rolDataService.delete(role.id).then( r => {
      this.spinner.hide();
      this.toastr.success('El rol ha sido eliminado correctamente.', 'Rol Eliminado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  edit_role() {
    this.isEditing = !this.isEditing;
    // if (!this.isEditing) {
    //   this.refresh();
    // }
  }

}
