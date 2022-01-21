import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesPageRoutingModule } from './roles-page-routing.module';
import { RolesPageComponent } from './roles-page.component';
import { FormsModule } from '@angular/forms';
import { RolService } from 'src/app/services/rol.service';


@NgModule({
  declarations: [
    RolesPageComponent
  ],
  imports: [
    CommonModule,
    RolesPageRoutingModule,
    FormsModule
  ],
  providers: [
    RolService
  ]
})
export class RolesPageModule { }
