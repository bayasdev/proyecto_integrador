import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultiesPageRoutingModule } from './faculties-page-routing.module';
import { FacultiesPageComponent } from './faculties-page.component';
import { FormsModule } from '@angular/forms';
import { RolService } from 'src/app/services/rol.service';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    FacultiesPageComponent
  ],
  imports: [
    CommonModule,
    FacultiesPageRoutingModule,
    FormsModule,
    OrderModule
  ],
  providers: [
    RolService
  ]
})
export class FacultiesPageModule { }
