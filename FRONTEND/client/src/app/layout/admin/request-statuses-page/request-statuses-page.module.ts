import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestStatusesPageRoutingModule } from './request-statuses-page-routing.module';
import { RequestStatusesPageComponent } from './request-statuses-page.component';
import { FormsModule } from '@angular/forms';
import { RolService } from 'src/app/services/rol.service';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    RequestStatusesPageComponent
  ],
  imports: [
    CommonModule,
    RequestStatusesPageRoutingModule,
    FormsModule,
    OrderModule
  ],
  providers: [
    RolService
  ]
})
export class RequestStatusesPageModule { }
