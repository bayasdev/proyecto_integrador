import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsPageRoutingModule } from './subjects-page-routing.module';
import { SubjectsPageComponent } from './subjects-page.component';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    SubjectsPageComponent
  ],
  imports: [
    CommonModule,
    SubjectsPageRoutingModule,
    FormsModule,
    OrderModule
  ],
  providers: []
})
export class SubjectsPageModule { }
