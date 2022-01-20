import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendedRequestPageRoutingModule } from './attended-request-page-routing.module';
import { AttendedRequestPageComponent } from './attended-request-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AttendedRequestPageComponent
  ],
  imports: [
    CommonModule,
    AttendedRequestPageRoutingModule,
    FormsModule
  ],
  providers: []
})
export class AttendedRequestPageModule { }
