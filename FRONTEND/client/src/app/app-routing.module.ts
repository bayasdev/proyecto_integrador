import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('src/app/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'denied-main',
    loadChildren: () => import('src/app/layout/denied-page/denied-page.module').then(m => m.DeniedPageModule)
  },
  {
    path: 'attended-request',
    loadChildren: () => import('src/app/layout/attended-request-page/attended-request-page.module').then(m => m.AttendedRequestPageModule)
  },
  {
    path: '',
    loadChildren: () => import('src/app/layout/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
