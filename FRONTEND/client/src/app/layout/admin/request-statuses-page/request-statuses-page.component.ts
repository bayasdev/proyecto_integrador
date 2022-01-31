import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestStatusService } from 'src/app/services/request-status.service';

@Component({
  selector: 'app-request-statuses-page',
  templateUrl: './request-statuses-page.component.html',
  styleUrls: ['./request-statuses-page.component.scss']
})
export class RequestStatusesPageComponent implements OnInit {
  roles: any[] = [];
  new_role_name: string = '';
  selected_role: any = {};
  isEditing: boolean = false;

  order: string = 'id';

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private requestStatusDataService: RequestStatusService) { }

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
    this.requestStatusDataService.get().then( r => {
      this.spinner.hide();
      this.roles = r;
    }).catch( e => { console.log(e) });
  }

  create_role(){
    this.spinner.show();
    if (this.new_role_name == '') {
      this.spinner.hide();
      this.toastr.error('El nombre del estado no puede estar vacio.', 'Error');
      return;
    }
    this.requestStatusDataService.create(this.new_role_name).then( r => {
      this.spinner.hide();
      this.toastr.success('El estado ha sido creado correctamente.', 'Estado Creado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  update_role(role: any){
    this.spinner.show();
    if (role.name == '') {
      this.spinner.hide();
      this.toastr.error('El nombre del estado no puede estar vacio.', 'Error');
      return;
    }
    this.requestStatusDataService.update(role.id, role.name).then( r => {
      this.spinner.hide();
      this.toastr.success('El estado ha sido actualizado correctamente.', 'Estado Actualizado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  delete_role(role: any){
    this.spinner.show();
    this.requestStatusDataService.delete(role.id).then( r => {
      this.spinner.hide();
      this.toastr.success('El estado ha sido eliminado correctamente.', 'Estado Eliminado');
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
