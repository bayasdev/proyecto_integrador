import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestViewerPageRoutingModule } from './request-viewer-page-routing.module';
import { RequestViewerPageComponent } from './request-viewer-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RequestViewerPageComponent
  ],
  imports: [
    CommonModule,
    RequestViewerPageRoutingModule,
    FormsModule
  ],
  providers: []
})
export class RequestViewerPageModule { }
