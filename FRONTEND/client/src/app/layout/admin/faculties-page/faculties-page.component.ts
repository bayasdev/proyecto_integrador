import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeanService } from 'src/app/services/dean.service';

@Component({
  selector: 'app-faculties-page',
  templateUrl: './faculties-page.component.html',
  styleUrls: ['./faculties-page.component.scss']
})
export class FacultiesPageComponent implements OnInit {
  deans: any[] = [];
  new_dean: any = {
    name: '',
    identification: ''
  }
  selected_dean: any = {};
  isEditing: boolean = false;

  order: string = 'id';

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private deanDataService: DeanService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.new_dean.name = '';
    this.new_dean.identification = '';
    this.isEditing = false;
    this.get_deans();
  }

  select_dean(dean: any) {
    this.selected_dean = dean;
  }

  get_deans(){
    this.spinner.show();
    this.deans = [];
    this.deanDataService.get().then( r => {
      this.spinner.hide();
      this.deans = r;
    }).catch( e => { console.log(e) });
  }

  create_dean(){
    this.spinner.show();
    if (this.new_dean.name == '' || this.new_dean.identification == '') {
      this.spinner.hide();
      this.toastr.error('El nombre y/o cédula del Decano no pueden estar vacios.', 'Error');
      return;
    }
    this.deanDataService.create(this.new_dean.name, this.new_dean.identification).then( r => {
      this.spinner.hide();
      this.toastr.success('El Decano ha sido creado correctamente.', 'Decano Creado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  update_dean(dean: any){
    this.spinner.show();
    this.deanDataService.update(dean.id, dean.name, dean.identification).then( r => {
      this.spinner.hide();
      this.toastr.success('El Decano ha sido actualizado correctamente.', 'Decano Actualizado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  delete_dean(dean: any){
    this.spinner.show();
    this.deanDataService.delete(dean.id).then( r => {
      this.spinner.hide();
      this.toastr.success('El Decano ha sido eliminado correctamente.', 'Decano Eliminado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  edit_dean() {
    this.isEditing = !this.isEditing;
  }

}
