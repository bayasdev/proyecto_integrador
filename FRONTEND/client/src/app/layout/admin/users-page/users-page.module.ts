import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersPageRoutingModule } from './users-page-routing.module';
import { UsersPageComponent } from './users-page.component';
import { FormsModule } from '@angular/forms';
import { RolService } from 'src/app/services/rol.service';


@NgModule({
  declarations: [
    UsersPageComponent
  ],
  imports: [
    CommonModule,
    UsersPageRoutingModule,
    FormsModule
  ],
  providers: [
    RolService
  ]
})
export class UsersPageModule { }
