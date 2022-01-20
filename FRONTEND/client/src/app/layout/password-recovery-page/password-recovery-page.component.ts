import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-recovery-page',
  templateUrl: './password-recovery-page.component.html',
  styleUrls: ['./password-recovery-page.component.scss']
})
export class PasswordRecoveryPageComponent implements OnInit {

  token: string = '';
  isOk: boolean = false;
  resp: string = ''

  constructor(private route: ActivatedRoute, private authDataService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.token = params.r;
      this.reset();
    });
  }

  reset() {
    this.spinner.show();
    this.authDataService.password_recovery_confirm(this.token).then( r => {
      this.spinner.hide();
      this.isOk = true;
      this.resp = r;
    }).catch( e => {
      this.spinner.hide();
      this.isOk = false;
      this.resp = e.error;
    });
  }

}
