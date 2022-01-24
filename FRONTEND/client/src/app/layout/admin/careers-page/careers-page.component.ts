import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CareerService } from 'src/app/services/career.service';
import { DirectorService } from 'src/app/services/director.service';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-careers-page',
  templateUrl: './careers-page.component.html',
  styleUrls: ['./careers-page.component.scss']
})
export class CareersPageComponent implements OnInit {
  careers: any[] = [];
  new_career: any = {
    name: '',
    director: 1,
    faculty: 1,
  };
  selected_career: any = {};
  directors: any[] = [];
  faculties: any[] = [];
  isEditing: boolean = false;

  order: string = 'id';

  constructor(private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private careerDataService: CareerService,
              private facultyDataService: FacultyService,
              private directorDataService: DirectorService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.new_career.name = '';
    this.new_career.director = 1;
    this.new_career.faculty = 1;
    this.isEditing = false;
    this.get_careers();
    this.get_directors();
    this.get_faculties();
  }

  select_career(career: any) {
    this.selected_career = career;
  }

  async get_careers(){
    this.spinner.show();
    this.careers = [];
    this.careerDataService.get().then( r => {
      this.spinner.hide();
      this.careers = r;
    }).catch( e => { console.log(e) });
  }

  create_career(){
    this.spinner.show();
    if (this.new_career.name == '') {
      this.spinner.hide();
      this.toastr.error('El nombre no puede estar vacio.', 'Error');
      return;
    }
    this.careerDataService.create(this.new_career.name, this.new_career.director, this.new_career.faculty).then( r => {
      this.spinner.hide();
      this.toastr.success('La carrera ha sido creada correctamente.', 'Carrera Creada');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  update_career(career: any){
    this.spinner.show();
    if (career.name == ''){
      this.spinner.hide();
      this.toastr.error('El nombre no puede estar vacio.', 'Error');
      return;
    }
    this.careerDataService.update(career.id, career.name, career.director_id, career.faculty_id).then( r => {
      this.spinner.hide();
      this.toastr.success('La carrera ha sido actualizada correctamente.', 'Carrera Actualizada');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  delete_career(career: any){
    this.spinner.show();
    this.careerDataService.delete(career.id).then( r => {
      this.spinner.hide();
      this.toastr.success('La carrera ha sido eliminada correctamente.', 'Carrera Eliminada');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  edit_career() {
    this.isEditing = !this.isEditing;
  }

  get_directors(){
    this.spinner.show();
    this.directors = [];
    this.directorDataService.get().then( r => {
      this.spinner.hide();
      this.directors = r;
    }).catch( e => { console.log(e) });
  }

  get_faculties(){
    this.spinner.show();
    this.directors = [];
    this.facultyDataService.get().then( r => {
      this.spinner.hide();
      this.faculties = r;
    }).catch( e => { console.log(e) });
  }

}
