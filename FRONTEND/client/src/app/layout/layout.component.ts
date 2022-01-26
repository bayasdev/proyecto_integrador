import { CatalogService } from 'src/app/services/catalog.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user: any = {};
  constructor() { }

  ngOnInit(): void {
    const token: string = sessionStorage.getItem('token') as string;
    const decoded: any = jwt_decode(token);
    this.user = decoded;
  }

}
