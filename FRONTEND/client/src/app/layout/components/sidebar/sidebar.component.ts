import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  @Input('user') user: any = {};

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
      expectedRole: 99,
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
      expectedRole: 99,
      items: [
        {
          name: 'Crear Solicitud',
          icon: 'fas fa-plus-circle',
          link: '/student/new-request'
        }
      ]
    },
    // historico
    {
      name: 'HISTÓRICO',
      expectedRole: 99,
      items: [
        {
          name: 'Mis Solicitudes',
          icon: 'fas fa-history',
          link: '/student/requests'
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
          name: 'Facultades',
          icon: 'fas fa-university',
          link: '/admin/faculties'
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
      ]
    },
    // cuenta
    {
      name: 'CUENTA',
      expectedRole: 99,
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
