import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  // sidebar links

  links: any[] = [
    // dashboard
    {
      name: 'DASHBOARD',
      items: [
        {
          name: 'Inicio',
          icon: 'fas fa-home',
          link: '/dashboard'
        }
      ]
    },
    // servicios
    {
      name: 'SERVICIOS',
      items: [
        {
          name: 'Crear Solicitud',
          icon: 'fas fa-plus-circle',
          link: '/student/petition'
        }
      ]
    },
    // historico
    {
      name: 'HISTÓRICO',
      items: [
        {
          name: 'Mis Solicitudes',
          icon: 'fas fa-history',
          link: '/student/petitions'
        }
      ]
    },
    // admin
    {
      name: 'ADMINISTRACIÓN',
      items: [
        {
          name: 'Usuarios',
          icon: 'fas fa-users-cog',
          link: '/admin/users'
        },
        {
          name: 'Roles',
          icon: 'fas fa-user-tag',
          link: '/admin/roles'
        },
        {
          name: 'Carreras',
          icon: 'fas fa-graduation-cap',
          link: '/admin/careers'
        },
        {
          name: 'Materias',
          icon: 'fas fa-book',
          link: '/admin/subjects'
        },
        {
          name: 'Directores de Carrera',
          icon: 'fas fa-chalkboard-teacher',
          link: '/admin/directors'
        },
        {
          name: 'Facultades',
          icon: 'fas fa-university',
          link: '/admin/faculties'
        },
        {
          name: 'Decanos',
          icon: 'fas fa-user-tie',
          link: '/admin/deans'
        },
        {
          name: 'Tipos de Solicitud',
          icon: 'fas fa-folder-plus',
          link: '/admin/petition/types'
        },
      ]
    },
    // cuenta
    {
      name: 'CUENTA',
      items: [
        {
          name: 'Editar perfil',
          icon: 'fas fa-user-edit',
          link: '/profile'
        },
        {
          name: 'Cerrar sesión',
          icon: 'fas fa-sign-out-alt',
          link: ''
        }
      ]
    },
  ]

  // aviable(rol_requireds: any[]): boolean {
  //   let roles_usuario: any[] = [];
  //   if (typeof this.user.rols !== 'undefined') {
  //     roles_usuario = this.user.rols;
  //   }
  //   if (rol_requireds.length == 0) {
  //     return true;
  //   }
  //   let toReturn: boolean = false;
  //   rol_requireds.forEach((rol_required: any) => {
  //     roles_usuario.forEach((rol_usuario:any) => {
  //       if (rol_required == rol_usuario) {
  //         toReturn = true;
  //       }
  //     });
  //   });
  //   return toReturn;
  // }
}
