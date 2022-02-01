import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareersPageRoutingModule } from './careers-page-routing.module';
import { CareersPageComponent } from './careers-page.component';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    CareersPageComponent
  ],
  imports: [
    CommonModule,
    CareersPageRoutingModule,
    FormsModule,
    OrderModule
  ],
  providers: []
})
export class CareersPageModule { }
