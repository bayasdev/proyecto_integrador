import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Common
      {
        path: 'dashboard',
        loadChildren: () => import('src/app/layout/dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('src/app/layout/profile-page/profile-page.module').then(m => m.ProfilePageModule)
      },

      // Admin
      {
        path: 'admin/roles',
        loadChildren: () => import('src/app/layout/admin/roles-page/roles-page.module').then(m => m.RolesPageModule)
      },
      {
        path: 'admin/users',
        loadChildren: () => import('src/app/layout/admin/users-page/users-page.module').then(m => m.UsersPageModule)
      },
      {
        path: 'admin/directors',
        loadChildren: () => import('src/app/layout/admin/directors-page/directors-page.module').then(m => m.DirectorsPageModule)
      },
      {
        path: 'admin/deans',
        loadChildren: () => import('src/app/layout/admin/deans-page/deans-page.module').then(m => m.DeansPageModule)
      },
      
      // 403
      {
        path: 'denied',
        loadChildren: () => import('src/app/layout/denied-page/denied-page.module').then(m => m.DeniedPageModule)
      },

      // 404
      {
        path: 'not-found',
        loadChildren: () => import('src/app/layout/not-found-page/not-found-page.module').then(m => m.NotFoundPageModule)
      },
      {
         path: '**',
         redirectTo: 'not-found'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
