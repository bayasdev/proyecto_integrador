import { NavigationEnd, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input('user') user: any = {};

  roles = [
    {
      id: 1,
      name: 'Administrador'
    },
    {
      id: 2,
      name: 'Decano'
    },
    {
      id: 3,
      name: 'Director de Carrera'
    },
    {
      id: 4,
      name: 'Contabilidad'
    },
    {
      id: 5,
      name: 'Estudiante'
    },
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
