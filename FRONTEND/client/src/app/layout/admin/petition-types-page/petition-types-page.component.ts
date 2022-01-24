import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { PetitionTypeService } from 'src/app/services/petitiontype.service';

@Component({
  selector: 'app-petition-types-page',
  templateUrl: './petition-types-page.component.html',
  styleUrls: ['./petition-types-page.component.scss']
})
export class PetitionTypesPageComponent implements OnInit {
  petitiontypes: any[] = [];
  new_petitiontype_name: string = '';
  selected_petitiontype: any = {};
  isEditing: boolean = false;

  order: string = 'id';

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private petitionTypeDataService: PetitionTypeService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.new_petitiontype_name = '';
    this.isEditing = false;
    this.get_petitiontypes();
  }

  select_petitiontype(petitiontype: any) {
    this.selected_petitiontype = petitiontype;
  }

  get_petitiontypes(){
    this.spinner.show();
    this.petitiontypes = [];
    this.petitionTypeDataService.get().then( r => {
      this.spinner.hide();
      this.petitiontypes = r;
    }).catch( e => { console.log(e) });
  }

  create_petitiontype(){
    this.spinner.show();
    if (this.new_petitiontype_name == '') {
      this.spinner.hide();
      this.toastr.error('El nombre del tipo de solicitud no puede estar vacio.', 'Error');
      return;
    }
    this.petitionTypeDataService.create(this.new_petitiontype_name).then( r => {
      this.spinner.hide();
      this.toastr.success('El tipo de solicitud ha sido creado correctamente.', 'Tipo de Solicitud Creado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  update_petitiontype(petitiontype: any){
    this.spinner.show();
    if (petitiontype.name == '') {
      this.spinner.hide();
      this.toastr.error('El nombre del tipo de solicitud no puede estar vacio.', 'Error');
      return;
    }
    this.petitionTypeDataService.update(petitiontype.id, petitiontype.name).then( r => {
      this.spinner.hide();
      this.toastr.success('El tipo de solicitud ha sido actualizado correctamente.', 'Tipo de Solicitud Actualizado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  delete_petitiontype(petitiontype: any){
    this.spinner.show();
    this.petitionTypeDataService.delete(petitiontype.id).then( r => {
      this.spinner.hide();
      this.toastr.success('El tipo de solicitud ha sido eliminado correctamente.', 'Tipo de Solicitud Eliminado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  edit_petitiontype() {
    this.isEditing = !this.isEditing;
  }

}
