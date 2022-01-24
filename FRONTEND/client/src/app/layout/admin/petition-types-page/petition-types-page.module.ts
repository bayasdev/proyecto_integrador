import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetitionTypesPageRoutingModule } from './petition-types-page-routing.module';
import { PetitionTypesPageComponent } from './petition-types-page.component';
import { FormsModule } from '@angular/forms';
import { RolService } from 'src/app/services/rol.service';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    PetitionTypesPageComponent
  ],
  imports: [
    CommonModule,
    PetitionTypesPageRoutingModule,
    FormsModule,
    OrderModule
  ],
  providers: [
    RolService
  ]
})
export class PetitionTypesPageModule { }
