import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FacultyService } from 'src/app/services/faculty.service';
import { DeanService } from 'src/app/services/dean.service';

@Component({
  selector: 'app-faculties-page',
  templateUrl: './faculties-page.component.html',
  styleUrls: ['./faculties-page.component.scss']
})
export class FacultiesPageComponent implements OnInit {
  faculties: any[] = [];
  new_faculty: any = {
    name: '',
    dean: 1,
  };
  selected_faculty: any = {};
  deans: any[] = [];
  isEditing: boolean = false;

  order: string = 'id';

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private facultyDataService: FacultyService, private deanDataService: DeanService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.new_faculty.name = '';
    this.new_faculty.dean = 1;
    this.isEditing = false;
    this.get_deans();
    this.get_faculties();
  }

  select_faculty(faculty: any) {
    this.selected_faculty = faculty;
  }

  get_faculties(){
    this.spinner.show();
    this.faculties = [];
    this.facultyDataService.get().then( r => {
      this.spinner.hide();
      this.faculties = r;
    }).catch( e => { console.log(e) });
  }

  create_faculty(){
    this.spinner.show();
    if (this.new_faculty.name == '') {
      this.spinner.hide();
      this.toastr.error('El nombre no puede estar vacio.', 'Error');
      return;
    }
    this.facultyDataService.create(this.new_faculty.name, this.new_faculty.dean).then( r => {
      this.spinner.hide();
      this.toastr.success('La facultad ha sido creada correctamente.', 'Facultad Creada');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  update_faculty(faculty: any){
    this.spinner.show();
    if (faculty.name == ''){
      this.spinner.hide();
      this.toastr.error('El nombre no puede estar vacio.', 'Error');
      return;
    }
    this.facultyDataService.update(faculty.id, faculty.name, faculty.dean_id).then( r => {
      this.spinner.hide();
      this.toastr.success('La facultad ha sido actualizada correctamente.', 'Facultad Actualizada');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  delete_faculty(faculty: any){
    this.spinner.show();
    this.facultyDataService.delete(faculty.id).then( r => {
      this.spinner.hide();
      this.toastr.success('La facultad ha sido eliminada correctamente.', 'Facultad Eliminada');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  edit_faculty() {
    this.isEditing = !this.isEditing;
  }

  get_deans(){
    this.spinner.show();
    this.deans = [];
    this.deanDataService.get().then( r => {
      this.spinner.hide();
      this.deans = r;
    }).catch( e => { console.log(e) });
  }

}
