import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesPageRoutingModule } from './files-page-routing.module';
import { FilesPageComponent } from './files-page.component';
import { FormsModule } from '@angular/forms';
import { RolService } from 'src/app/services/rol.service';
import { OrderModule } from 'ngx-order-pipe';
import { NgxFileDropModule } from 'ngx-file-drop';


@NgModule({
  declarations: [
    FilesPageComponent
  ],
  imports: [
    CommonModule,
    FilesPageRoutingModule,
    FormsModule,
    OrderModule,
    NgxFileDropModule
  ],
  providers: [
    RolService
  ]
})
export class FilesPageModule { }
