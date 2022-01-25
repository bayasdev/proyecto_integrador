import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  role: number = 0;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.role = JSON.parse(sessionStorage.getItem('user') as string).role_id;
      const token: string = sessionStorage.getItem('token') as string;
      const decoded: any = jwt_decode(token);
      this.role = decoded.role;
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
      expectedRole: 'any',
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
      expectedRole: 5,
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
      expectedRole: 5,
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
      expectedRole: 1,
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
      expectedRole: 'any',
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

}
