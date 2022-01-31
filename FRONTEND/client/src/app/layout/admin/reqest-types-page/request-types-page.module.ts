import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestTypesPageRoutingModule } from './request-types-page-routing.module';
import { RequestTypesPageComponent } from './request-types-page.component';
import { FormsModule } from '@angular/forms';
import { RolService } from 'src/app/services/rol.service';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    RequestTypesPageComponent
  ],
  imports: [
    CommonModule,
    RequestTypesPageRoutingModule,
    FormsModule,
    OrderModule
  ],
  providers: [
    RolService
  ]
})
export class RequestTypesPageModule { }
