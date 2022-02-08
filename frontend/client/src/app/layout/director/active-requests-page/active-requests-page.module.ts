import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveRequestsPageRoutingModule } from './active-requests-page-routing.module';
import { ActiveRequestsPageComponent } from './active-requests-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActiveRequestsPageComponent
  ],
  imports: [
    CommonModule,
    ActiveRequestsPageRoutingModule,
    FormsModule
  ],
  providers: []
})
export class ActiveRequestsPageModule { }
