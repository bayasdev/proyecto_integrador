import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRequestsPageRoutingModule } from './my-requests-page-routing.module';
import { MyRequestsPageComponent } from './my-requests-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyRequestsPageComponent
  ],
  imports: [
    CommonModule,
    MyRequestsPageRoutingModule,
    FormsModule
  ],
  providers: []
})
export class MyRequestsPageModule { }
