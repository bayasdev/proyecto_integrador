import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultiesPageRoutingModule } from './faculties-page-routing.module';
import { FacultiesPageComponent } from './faculties-page.component';
import { FormsModule } from '@angular/forms';
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
  providers: []
})
export class FacultiesPageModule { }
