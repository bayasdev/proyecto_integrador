import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRecoveryPageRoutingModule } from './password-recovery-page-routing.module';
import { PasswordRecoveryPageComponent } from './password-recovery-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PasswordRecoveryPageComponent
  ],
  imports: [
    CommonModule,
    PasswordRecoveryPageRoutingModule,
    FormsModule
  ],
  providers: []
})
export class PasswordRecoveryPageModule { }
