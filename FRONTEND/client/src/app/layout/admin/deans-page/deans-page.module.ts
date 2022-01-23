import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeansPageRoutingModule } from './deans-page-routing.module';
import { DeansPageComponent } from './deans-page.component';
import { FormsModule } from '@angular/forms';
import { RolService } from 'src/app/services/rol.service';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    DeansPageComponent
  ],
  imports: [
    CommonModule,
    DeansPageRoutingModule,
    FormsModule,
    OrderModule
  ],
  providers: [
    RolService
  ]
})
export class DeansPageModule { }
