import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersPageRoutingModule } from './users-page-routing.module';
import { UsersPageComponent } from './users-page.component';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    UsersPageComponent
  ],
  imports: [
    CommonModule,
    UsersPageRoutingModule,
    FormsModule,
    OrderModule
  ],
  providers: []
})
export class UsersPageModule { }
