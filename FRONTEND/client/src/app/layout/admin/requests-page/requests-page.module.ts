import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsPageRoutingModule } from './requests-page-routing.module';
import { RequestsPageComponent } from './requests-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RequestsPageComponent
  ],
  imports: [
    CommonModule,
    RequestsPageRoutingModule,
    FormsModule
  ],
  providers: []
})
export class RequestsPageModule { }
