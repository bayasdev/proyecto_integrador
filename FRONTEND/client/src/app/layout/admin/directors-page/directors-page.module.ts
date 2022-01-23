import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorsPageRoutingModule } from './directors-page-routing.module';
import { DirectorsPageComponent } from './directors-page.component';
import { FormsModule } from '@angular/forms';
import { RolService } from 'src/app/services/rol.service';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    DirectorsPageComponent
  ],
  imports: [
    CommonModule,
    DirectorsPageRoutingModule,
    FormsModule,
    OrderModule
  ],
  providers: [
    RolService
  ]
})
export class DirectorsPageModule { }
