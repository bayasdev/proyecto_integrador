import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeniedPageRoutingModule } from './denied-page-routing.module';
import { DeniedPageComponent } from './denied-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DeniedPageComponent
  ],
  imports: [
    CommonModule,
    DeniedPageRoutingModule,
    FormsModule
  ],
  providers: []
})
export class DeniedPageModule { }
