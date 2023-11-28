import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  faUser,
  faKey,
  faEyeSlash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { AuthgaurdService } from 'src/app/core/services/authgaurd.service';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import {NgxSpinnerService} from 'ngx-spinner'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  usericon = { faUser, faKey, faEyeSlash, faEye };
  eyeicon = this.usericon.faEyeSlash;
  loginform!: FormGroup;
  loginbtn = 'Log In';
  token_response: any;
  token: any;
  submited: any = false;
  isEmailValid: any = false;
  visible: boolean = false;
  changetype: boolean = true;
 
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private authGuardservice: AuthgaurdService,
    private router: Router,
    private notifier:NotifierService,
    private ngZone: NgZone, 
    private spinner:NgxSpinnerService
  ) {

    //this.spinner.show();
  }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    //this.spinner.hide();
  }
  hideshowpassword() {
    this.isText = !this.isText;
    this.isText
      ? (this.eyeicon = this.usericon.faEye)
      : (this.eyeicon = this.usericon.faEyeSlash);
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  onSubmit() {
    if (this.loginform.valid) {
      console.log(this.loginform.value);
      var formdata = new FormData();
      formdata.append('username', this.loginform.value.username);
      formdata.append('password', this.loginform.value.password);
      this.auth.login(formdata).subscribe({
        next: (res: any) => {
          if (res != null && res != '' && res != 'undefined') {
            this.spinner.show();
            //alert(res.access_token);
            this.submited = false;
            this.token_response = res;
            console.log(this.token_response);
            if (this.token_response.userRoleId != null) {
              this.token = this.token_response.access_token;
              localStorage.setItem(
                'muranu_tokenresponse',
                JSON.stringify(this.token_response)
              );
              localStorage.setItem(
                'timer',
                JSON.stringify(
                  Date.now() + this.token_response.expires_in * 1000
                )
              );
              if (res.IsMultiFactorAuth) {
                if (res.IsEmailAuth) {
                  //this.ResentEmailOTPtoUser();
                }
                localStorage.setItem('isAuthenticated', 'false');
                setTimeout(() => {
                  //this.router.navigate(['/MultiFactorAuthentication']);
                }, 500);
              } else {
                localStorage.setItem('isAuthenticated', 'true');
                this.authGuardservice.authguard();
                // const targetScreen = this.userService.getTargetScreen();
                this.loginbtn = 'Authenticating...';
                // if (targetScreen) {
                //   this.router.navigateByUrl(targetScreen);
                // } else {
                  this.notifier.notify('success', 'Login Success...')
                this.ngZone.runOutsideAngular(() => {

                  setTimeout(() => {
                    this.spinner.hide();
                    // Use ngZone.run() to update Angular bindings inside setTimeout
                    this.ngZone.run(() => {
                      this.router.navigate(['/quotes']);
                    });
                  }, 3000); // 3000 milliseconds (3 seconds) delay
                });
                //}
              }
            } else {
              //this.toastralert.toastrerror('Access not allowed for this user');
              this.loginbtn = 'Log In';
            }
          } else {
            //this.toastralert.toastrerror('Access not allowed for this user');
            this.loginbtn = 'Log In';
            this.submited = false;
          }
        },
        error: (err) => {
          alert(err?.error.message);
          this.loginbtn = 'Log In';
          this.submited = false;
        },
      });
    } else {
      console.log('required');
      ValidateForm.validateAllFormFields(this.loginform);
    }
  }


  
}



