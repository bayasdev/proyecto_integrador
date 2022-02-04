import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRequestPageRoutingModule } from './new-request-page-routing.module';
import { NewRequestPageComponent } from './new-request-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewRequestPageComponent
  ],
  imports: [
    CommonModule,
    NewRequestPageRoutingModule,
    FormsModule
  ],
  providers: []
})
export class NewRequestPageModule { }
