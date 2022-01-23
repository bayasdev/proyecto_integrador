import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DirectorService } from 'src/app/services/director.service';


@Component({
  selector: 'app-directors-page',
  templateUrl: './directors-page.component.html',
  styleUrls: ['./directors-page.component.scss']
})
export class DirectorsPageComponent implements OnInit {
  directors: any[] = [];
  new_director: any = {
    name: '',
    identification: ''
  }
  selected_director: any = {};
  isEditing: boolean = false;

  order: string = 'id';

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private directorDataService: DirectorService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.new_director.name = '';
    this.new_director.identification = '';
    this.isEditing = false;
    this.get_directors();
  }

  select_director(director: any) {
    this.selected_director = director;
  }

  get_directors(){
    this.spinner.show();
    this.directors = [];
    this.directorDataService.get().then( r => {
      this.spinner.hide();
      this.directors = r;
    }).catch( e => { console.log(e) });
  }

  create_director(){
    this.spinner.show();
    if (this.new_director.name == '' || this.new_director.identification == '') {
      this.spinner.hide();
      this.toastr.error('El nombre y/o cédula del Director no pueden estar vacios.', 'Error');
      return;
    }
    this.directorDataService.create(this.new_director.name, this.new_director.identification).then( r => {
      this.spinner.hide();
      this.toastr.success('El Director ha sido creado correctamente.', 'Director Creado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  update_director(director: any){
    this.spinner.show();
    this.directorDataService.update(director.id, director.name, director.identification).then( r => {
      this.spinner.hide();
      this.toastr.success('El Director ha sido actualizado correctamente.', 'Director Actualizado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  delete_director(director: any){
    this.spinner.show();
    this.directorDataService.delete(director.id).then( r => {
      this.spinner.hide();
      this.toastr.success('El Director ha sido eliminado correctamente.', 'Director Eliminado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  edit_director() {
    this.isEditing = !this.isEditing;
  }

}
