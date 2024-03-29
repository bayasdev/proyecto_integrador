import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Auth
  {
    path: 'login',
    loadChildren: () => import('src/app/login-page/login-page.module').then(m => m.LoginPageModule)
  },

  // Password Recovery
  {
    path: 'password-recovery',
    loadChildren: () => import('src/app/layout/password-recovery-page/password-recovery-page.module').then(m => m.PasswordRecoveryPageModule)
  },

  // Redirect / to dashboard if logged in
  {
    path: '',
    loadChildren: () => import('src/app/layout/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
