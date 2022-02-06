import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RequestAttachmentService } from 'src/app/services/request-attachment.service';
import { RequestService } from 'src/app/services/request.service';
import { saveAs } from 'file-saver';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-request-viewer-page',
  templateUrl: './request-viewer-page.component.html',
  styleUrls: ['./request-viewer-page.component.scss']
})
export class RequestViewerPageComponent implements OnInit {
  
  user: any = {};

  request: any = {};
  
  request_types = [
    {
      id: 1,
      name: 'Modificación de Carga Académica'
    },
    {
      id: 2,
      name: 'Retiro en Asignatura'
    },
  ];
  
  request_statuses = [
    {
      id: 1,
      name: 'Pago Pendiente'
    },
    {
      id: 2,
      name: 'Pago Aprobado'
    },
    {
      id: 3,
      name: 'Pago Rechazado'
    },
    {
      id: 4,
      name: 'Aprobado por Director'
    },
    {
      id: 5,
      name: 'Rechazado por Director'
    },
    {
      id: 6,
      name: 'Aprobado por Decano'
    },
    {
      id: 7,
      name: 'Rechazado por Decano'
    },
  ];
  
  attachment_types = [
    {
      id: 1,
      name: 'Comprobante de Pago'
    },
    {
      id: 2,
      name: 'Otros'
    }
  ]
  
  id_request!: number;
  
  isLoaded: boolean = false;

  imgBase64!: any;

  isAllowed: boolean = false;

  allowStatus!: number;

  rejectStatus!: number;

  file!: any;

  replyMessage: string = '';
  
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private requestDataService: RequestService,
    private requestAttachmentDataService: RequestAttachmentService
    ) { }
    
    ngOnInit(): void {
      this.route.queryParams.subscribe((params: any) => {
        const token: string = sessionStorage.getItem('token') as string;
        this.user = jwt_decode(token);
        this.id_request = params.id;
        this.refresh();
      });
    }
    
    async refresh(){
      // asynchronously get requests
      await this.get_request();

      // logic to check if it's allowed to reply to request
      // also check if request belongs to them

      // accountant
      if(this.user.role == 4 && this.request.request_status == 1){
        this.isAllowed = true;
        this.allowStatus = 2;
        this.rejectStatus = 3;
      // director
      } else if (this.user.role == 3 && this.user.sub == this.request.director_id && this.request.request_status == 2){
        this.isAllowed = true;
        this.allowStatus = 4;
        this.rejectStatus = 5;
      // dean
      } else if (this.request.request_type == 2 && this.user.role == 2 && this.user.sub == this.request.dean_id && this.request.request_status == 4){
        this.isAllowed = true;
        this.allowStatus = 6;
        this.rejectStatus = 7;
      } else {
        this.isAllowed = false;
      }
    }
    
    async get_request(): Promise<any>{
      this.spinner.show();
      this.request = [];
      this.isLoaded = false; // reset flag
      try {
        this.request = await this.requestDataService.getById(this.id_request);
        this.request.created_at = this.request.created_at.replace(/T.*$/,"");
        // don't let students that don't own the request to view it
        if (this.user.role != 5 || this.request.student_id == this.user.sub) {
          this.isLoaded = true;
        }
      } catch (e) {
        this.toastr.error('Ocurrió un error', 'Error');
      }
      this.spinner.hide();
    }
    
    async get_attachment(id: number): Promise<any>{
      this.spinner.show();
      let r;
      try {
        r = await this.requestAttachmentDataService.getById(id);
      } catch (e) {
        this.toastr.error('Ocurrió un error', 'Error')
      }
      this.spinner.hide();
      if (['image/jpeg', 'image/png'].includes(r.file_type)) {
        this.imgBase64 = 'data:'+r.file_type+';base64,'+r.file_content;
      }
      return r;
    }
    
    async download_attachment(id: number){
      const file = await this.get_attachment(id);
      // base64 to blob
      // código de StackOverflow (no preguntar cómo funciona)
      let sliceSize = 1024;
      let byteCharacters = atob(file.file_content);
      let bytesLength = byteCharacters.length;
      let slicesCount = Math.ceil(bytesLength / sliceSize);
      let byteArrays = new Array(slicesCount);
      
      for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        let begin = sliceIndex * sliceSize;
        let end = Math.min(begin + sliceSize, bytesLength);
        
        let bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
      }
      const decoded = new Blob(byteArrays, { type: file.file_type });
      // download the blob
      saveAs(decoded, file.file_name);
    }

    file_selected(event: any) {
      this.file = event.target.files[0];
    }
    
    update_request(type: number){
      this.spinner.show();
      // set status for buttons
      let status = type == 1? this.allowStatus: this.rejectStatus;
      // add reply message accordingly
      if (this.replyMessage != ''){
        switch (this.user.role)  {
          case 2:
            this.request.parameters.dean_message = this.replyMessage;
            break;
          case 3:
            this.request.parameters.director_message = this.replyMessage;
            break;
          case 4:
            this.request.parameters.accountant_message = this.replyMessage;
            break;
        }
      } else {
        this.spinner.hide();
        this.toastr.error('El campo de mensaje no puede estar vacio.', 'Error');
        return;
      }
      // if there's a file selected upload it
      if (this.file) {
        if (this.file.size > 10485760) {
          this.spinner.hide();
          this.toastr.error('El archivo es muy grande.', 'Error');
          return; 
        }
        // convert file input to base64
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          const base64 = (<string>reader.result).split(',')[1];
          // upload file to storage and wait for id
          this.requestAttachmentDataService.create(this.file.name, this.file.type, base64, 2).then( r => {
            // now update the request
            this.requestDataService.update(this.request.id, status, this.request.parameters, r.id).then( r => {
              this.spinner.hide();
              this.toastr.success('La solicitud ha sido actualizada correctamente.', 'Solicitud Actualizada')
              this.refresh();
            }).catch( e => { console.log(e) });
          }).catch( e => { console.log(e) });
        }
      // else just update the request
      } else {
        this.requestDataService.update(this.request.id, status, this.request.parameters).then( r => {
          this.spinner.hide();
          this.toastr.success('La solicitud ha sido actualizada correctamente.', 'Solicitud Actualizada')
          this.refresh();
        }).catch( e => { console.log(e) });
      }
    }
    
  }
  