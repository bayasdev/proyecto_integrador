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

  constructor(private route: ActivatedRoute, private authDataService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.token = params.r;
      this.reset();
    });
  }

  reset() {
    this.authDataService.password_recovery_confirm(this.token).then( r => {
      console.log(r);
      this.isOk = true;
      this.resp = r;
    }).catch( e => {
      this.isOk = false;
      this.resp = e.error;
    });
  }

}
