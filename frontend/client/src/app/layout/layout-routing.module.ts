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
      // 1 Administrador
      // 2 Decano
      // 3 Director de Carrera
      // 4 Contabilidad
      // 5 Estudiante
            
      // Common
      {
        path: 'dashboard',
        loadChildren: () => import('src/app/layout/dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule)
      },
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'profile',
        loadChildren: () => import('src/app/layout/profile-page/profile-page.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'request-viewer',
        loadChildren: () => import('src/app/layout/request-viewer-page/request-viewer-page.module').then(m => m.RequestViewerPageModule)
      },
      
      // Estudiante
      // Crear solicitud
      {
        path: 'student/new-request',
        loadChildren: () => import('src/app/layout/student/new-request-page/new-request-page.module').then(m => m.NewRequestPageModule),
        canActivate: [RoleGuard],
        data: {
          expectedRole: 5
        }
      },
      // ver solicitudes
      {
        path: 'student/requests',
        loadChildren: () => import('src/app/layout/student/my-requests-page/my-requests-page.module').then(m => m.MyRequestsPageModule),
        canActivate: [RoleGuard],
        data: {
          expectedRole: 5
        }
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
      // Todas las solicitudes
      {
        path: 'admin/requests',
        loadChildren: () => import('src/app/layout/admin/requests-page/requests-page.module').then(m => m.RequestsPageModule),
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
