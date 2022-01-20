import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input('user') user: any = {};
  @Input('menu') menu: any[] = [];

  showMenu: string = '0';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

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
