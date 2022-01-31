import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolService } from 'src/app/services/rol.service';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss']
})
export class FilesPageComponent implements OnInit {
  roles: any[] = [];
  new_role_name: string = '';
  selected_role: any = {};
  isEditing: boolean = false;

  order: string = 'id';

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private rolDataService: RolService) { }

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
    this.rolDataService.get().then( r => {
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
    this.rolDataService.create(this.new_role_name).then( r => {
      this.spinner.hide();
      this.toastr.success('El rol ha sido creado correctamente.', 'Rol Creado');
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
    this.rolDataService.update(role.id, role.name).then( r => {
      this.spinner.hide();
      this.toastr.success('El rol ha sido actualizado correctamente.', 'Rol Actualizado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  delete_role(role: any){
    this.spinner.show();
    this.rolDataService.delete(role.id).then( r => {
      this.spinner.hide();
      this.toastr.success('El rol ha sido eliminado correctamente.', 'Rol Eliminado');
      this.refresh();
    }).catch( e => { console.log(e) });
  }

  edit_role() {
    this.isEditing = !this.isEditing;
  }


  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event:any){
    console.log(event);
  }

  public fileLeave(event:any){
    console.log(event);
  }

}
