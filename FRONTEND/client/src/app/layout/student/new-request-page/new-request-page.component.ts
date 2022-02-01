import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CareerService } from 'src/app/services/career.service';
import { SubjectService } from 'src/app/services/subject.service';
import { RequestService } from 'src/app/services/request.service';
import { RequestAttachmentService } from 'src/app/services/request-attachment.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-new-request-page',
  templateUrl: './new-request-page.component.html',
  styleUrls: ['./new-request-page.component.scss']
})
export class NewRequestPageComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader!:ElementRef;
  
  user: any = {};

  request_types = [
    {
      id: 1,
      name: 'Modificación de Carga Académica'
    },
    {
      id: 2,
      name: 'Retiro en Asignatura'
    }
  ]
  careers: any[] = [];
  subjects: any[] = [];

  new_request = {
    type: 1,
    career: 1,
    parameters: {
      student_message: ''
    }
  }

  new_subjects: any[] = [];

  temp_subject: any;

  file: any;

  constructor(private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private subjectDataService: SubjectService,
              private careerDataService: CareerService,
              private requestDataService: RequestService,
              private requestAttachmentDataService: RequestAttachmentService
  ) { }

  ngOnInit(): void {
    const token: string = sessionStorage.getItem('token') as string;
    const decoded: any = jwt_decode(token);
    this.user = decoded;
    this.refresh();
  }

  refresh() {
    this.new_request.parameters.student_message = '';
    this.new_subjects = [];
    this.get_careers();
    this.get_subjects();
  }

  reset() {
    this.file = null;
    this.fileUploader.nativeElement.value = null;
    this.refresh();
  }

  get_careers(){
    this.spinner.show();
    this.careers = [];
    this.careerDataService.get().then( r => {
      this.spinner.hide();
      this.careers = r;
    }).catch( e => { console.log(e) });
  }

  get_subjects(){
    this.spinner.show();
    this.subjects = [];
    this.subjectDataService.getByCareer(this.new_request.career).then( r => {
      this.spinner.hide();
      this.subjects = r;
    }).catch( e => { console.log(e) });
  }

  add_subject(subject: any){
    if (this.new_subjects.includes(subject)) {
      this.toastr.error('La materia ya está seleccionada.', 'Error');
      return;
    }
    this.new_subjects.push(subject);
  }

  remove_subject(subject: any){
    let index = this.new_subjects.indexOf(subject);
    this.new_subjects.splice(index, 1);
  }

  file_selected(event: any) {
    this.file = event.target.files[0];
  }

  create_request(){
    // checks
    this.spinner.show();
    if (this.new_request.parameters.student_message == ''){
      this.spinner.hide();
      this.toastr.error('El campo de mensaje no puede estar vacio.', 'Error');
      return;
    } else if (this.new_subjects.length == 0) {
      this.spinner.hide();
      this.toastr.error('La lista de materias no puede estar vacia.', 'Error');
      return;
    } else if (this.new_subjects.some(subject => subject['career_id'] !== this.new_request.career)) {
      this.spinner.hide();
      this.toastr.error('La lista de materias contiene materias de otra carrera.', 'Error');
      return;
    } else if (!this.file) {
      this.spinner.hide();
      this.toastr.error('Debe adjuntar un archivo.', 'Error');
      return;
    } else if (!(['image/jpeg', 'image/png'].includes(this.file.type))) {
      this.spinner.hide();
      this.toastr.error('Tipo de archivo no soportado.', 'Error');
      return;
    } else if (this.file.size > 5242880) {
      this.spinner.hide();
      this.toastr.error('El archivo es muy grande.', 'Error');
      return;
    } else {
      // convert file input to base64
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        const base64 = (<string>reader.result).split(',')[1];
        // upload file to storage and wait for id
        this.requestAttachmentDataService.create(this.file.name, this.file.type, base64, 1).then( r => {
          // now create the request
          this.requestDataService.create(this.user.sub, this.new_request.career, this.new_request.type, this.new_request.parameters, r.id, this.new_subjects).then( r => {
            this.spinner.hide();
            this.toastr.success('La solicitud ha sido enviada correctamente.', 'Solicitud Enviada')
            this.reset();
          }).catch( e => { console.log(e) });
        }).catch( e => { console.log(e) });
      }
    }
  }
}
