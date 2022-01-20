import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attended-request-page',
  templateUrl: './attended-request-page.component.html',
  styleUrls: ['./attended-request-page.component.scss']
})
export class AttendedRequestPageComponent implements OnInit {

  title: string = '';
  message: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.title = params.title;
      this.message = params.message;
    });
  }

}
