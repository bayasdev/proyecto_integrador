import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../guards/role.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      // Roles
      // 1 administrador
      // 2 

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
      // Usuarios
      {
        path: 'admin/users',
        loadChildren: () => import('src/app/layout/admin/users-page/users-page.module').then(m => m.UsersPageModule),
        canActivate: [RoleGuard],
        data: {
          expectedRole: 1
        }
      },
      // Roles
      {
        path: 'admin/roles',
        loadChildren: () => import('src/app/layout/admin/roles-page/roles-page.module').then(m => m.RolesPageModule),
        canActivate: [RoleGuard],
        data: {
          expectedRole: 1
        }
      },
      // Directores de Carrera
      {
        path: 'admin/directors',
        loadChildren: () => import('src/app/layout/admin/directors-page/directors-page.module').then(m => m.DirectorsPageModule),
        canActivate: [RoleGuard],
        data: {
          expectedRole: 1
        }
      },
      // Decanos
      {
        path: 'admin/deans',
        loadChildren: () => import('src/app/layout/admin/deans-page/deans-page.module').then(m => m.DeansPageModule),
        canActivate: [RoleGuard],
        data: {
          expectedRole: 1
        }
      },
      // Facultades
      {
        path: 'admin/faculties',
        loadChildren: () => import('src/app/layout/admin/faculties-page/faculties-page.module').then(m => m.FacultiesPageModule),
        canActivate: [RoleGuard],
        data: {
          expectedRole: 1
        }
      },
      // Carreras
      {
        path: 'admin/careers',
        loadChildren: () => import('src/app/layout/admin/careers-page/careers-page.module').then(m => m.CareersPageModule),
        canActivate: [RoleGuard],
        data: {
          expectedRole: 1
        }
      },
      // Materias
      {
        path: 'admin/subjects',
        loadChildren: () => import('src/app/layout/admin/subjects-page/subjects-page.module').then(m => m.SubjectsPageModule),
        canActivate: [RoleGuard],
        data: {
          expectedRole: 1
        }
      },
      // Tipos de Solicitud
      {
        path: 'admin/request/types',
        loadChildren: () => import('src/app/layout/admin/reqest-types-page/request-types-page.module').then(m => m.RequestTypesPageModule),
        canActivate: [RoleGuard],
        data: {
          expectedRole: 1
        }
      },
      // Estados de Solicitud
      {
        path: 'admin/request/statuses',
        loadChildren: () => import('src/app/layout/admin/request-statuses-page/request-statuses-page.module').then(m => m.RequestStatusesPageModule),
        canActivate: [RoleGuard],
        data: {
          expectedRole: 1
        }
      },
      // Archivos Subidos
      {
        path: 'admin/files',
        loadChildren: () => import('src/app/layout/admin/files-page/files-page.module').then(m => m.FilesPageModule),
        canActivate: [RoleGuard],
        data: {
          expectedRole: 1
        }
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
  exports: [RouterModule],
  providers: [RoleGuard]
})
export class LayoutRoutingModule { }
