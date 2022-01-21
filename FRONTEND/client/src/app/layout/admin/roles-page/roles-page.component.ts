import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.scss']
})
export class RolesPageComponent implements OnInit {
  roles: any[] = [];
  new_role_name: string = '';
  selected_role: any = {};
  isEditing: boolean = false;

  constructor(private toastr: ToastrService, private rolDataService: RolService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.new_role_name = '';
    this.isEditing = false;
    this.get_roles();
  }

  select_rol(role: any) {
    this.selected_role = role;
  }

  get_roles(){
    this.roles = [];
    this.rolDataService.get().then( r => {
      this.roles = r;
      console.log(r);
    }).catch( e => { console.log(e) });
  }

  create_role(){
    this.rolDataService.create(this.new_role_name).then( r => {
      this.roles = r;
      console.log(r);
    }).catch( e => { console.log(e) });
  }

  update_role(){}

  delete_role(){}

}
