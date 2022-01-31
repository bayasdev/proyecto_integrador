import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestTypeService } from 'src/app/services/request-type.service';

@Component({
  selector: 'app-request-types-page',
  templateUrl: './request-types-page.component.html',
  styleUrls: ['./request-types-page.component.scss']
})
export class RequestTypesPageComponent implements OnInit {
  roles: any[] = [];
  new_role_name: string = '';
  selected_role: any = {};
  isEditing: boolean = false;

  order: string = 'id';

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private requestTypeDataService: RequestTypeService) { }

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
    this.requestTypeDataService.get().then( r => {
      this.spinner.hide();
      this.roles = r;
    }).catch( e => { console.log(e) });
  }

  create_role(){
    this.spinner.show();
    if (this.new_role_name == '') {
      this.spinner.hide();
      this.toastr.error('El nombre del rol no puede estar vacio.', 'Error');
      return;
    }
    this.requestTypeDataService.create(this.new_role_name).then( r => {
      this.spinner.hide();
      this.toastr.success('El tipo ha sido creado correctamente.', 'Tipo Creado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  update_role(role: any){
    this.spinner.show();
    if (role.name == '') {
      this.spinner.hide();
      this.toastr.error('El nombre del rol no puede estar vacio.', 'Error');
      return;
    }
    this.requestTypeDataService.update(role.id, role.name).then( r => {
      this.spinner.hide();
      this.toastr.success('El tipo ha sido actualizado correctamente.', 'Tipo Actualizado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  delete_role(role: any){
    this.spinner.show();
    this.requestTypeDataService.delete(role.id).then( r => {
      this.spinner.hide();
      this.toastr.success('El tipo ha sido eliminado correctamente.', 'Tipo Eliminado');
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
