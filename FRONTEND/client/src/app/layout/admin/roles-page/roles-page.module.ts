import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesPageRoutingModule } from './roles-page-routing.module';
import { RolesPageComponent } from './roles-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RolesPageComponent
  ],
  imports: [
    CommonModule,
    RolesPageRoutingModule,
    FormsModule
  ],
  providers: []
})
export class RolesPageModule { }
