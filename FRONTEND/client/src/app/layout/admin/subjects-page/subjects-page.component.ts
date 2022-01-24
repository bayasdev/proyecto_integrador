import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubjectService } from 'src/app/services/subject.service';
import { CareerService } from 'src/app/services/career.service';

@Component({
  selector: 'app-subjects-page',
  templateUrl: './subjects-page.component.html',
  styleUrls: ['./subjects-page.component.scss']
})
export class SubjectsPageComponent implements OnInit {
  subjects: any[] = [];
  new_subject: any = {
    name: '',
    code: '',
    credits: '',
    career: 1
  };
  selected_subject: any = {};
  careers: any[] = [];
  isEditing: boolean = false;

  order: string = 'id';

  constructor(private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private subjectDataService: SubjectService,
              private careerDataService: CareerService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.new_subject.name = '';
    this.new_subject.code = '';
    this.new_subject.credits = '';
    this.new_subject.career = 1;
    this.isEditing = false;
    this.get_careers();
    this.get_subjects();
  }

  select_subject(subject: any) {
    this.selected_subject = subject;
  }

  get_subjects(){
    this.spinner.show();
    this.subjects = [];
    this.subjectDataService.get().then( r => {
      this.spinner.hide();
      this.subjects = r;
    }).catch( e => { console.log(e) });
  }

  create_subject(){
    this.spinner.show();
    if (this.new_subject.name == '' || this.new_subject.code == '' || this.new_subject.credits == '') {
      this.spinner.hide();
      this.toastr.error('El nombre, código y/o créditos no pueden estar vacios.', 'Error');
      return;
    }
    this.subjectDataService.create(this.new_subject.name, this.new_subject.code, this.new_subject.credits, this.new_subject.career).then( r => {
      this.spinner.hide();
      this.toastr.success('La materia ha sido creada correctamente.', 'Materia Creada');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  update_subject(subject: any){
    this.spinner.show();
    if (subject.name == '' || subject.code == '' || subject.credits == ''){
      this.spinner.hide();
      this.toastr.error('El nombre, código y/o créditos no pueden estar vacios.', 'Error');
      return;
    }
    this.subjectDataService.update(subject.id, subject.name, subject.code, subject.credits, subject.carreer_id).then( r => {
      this.spinner.hide();
      this.toastr.success('La materia ha sido actualizada correctamente.', 'Materia Actualizada');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  delete_subject(subject: any){
    this.spinner.show();
    this.subjectDataService.delete(subject.id).then( r => {
      this.spinner.hide();
      this.toastr.success('La materia ha sido eliminada correctamente.', 'Materia Eliminada');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  edit_subject() {
    this.isEditing = !this.isEditing;
  }

  get_careers(){
    this.spinner.show();
    this.careers = [];
    this.careerDataService.get().then( r => {
      this.spinner.hide();
      this.careers = r;
    }).catch( e => { console.log(e) });
  }

}
