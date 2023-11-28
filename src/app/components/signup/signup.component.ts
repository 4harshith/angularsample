import { Component, OnInit,NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faKey, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthgaurdService } from 'src/app/core/services/authgaurd.service';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  usericon = { faUser, faKey, faEyeSlash, faEye };
  eyeicon = this.usericon.faEyeSlash;
  signform!:FormGroup;
  signupbtn='Sign Up';
  type: string = 'password';
  isText:boolean=false;
  submited: any = false;
  isEmailValid: any = false;
  visible: boolean = false;
  changetype: boolean = true;
  signup_response: any;
  showredirectmsg:string="" ;
constructor(
  private fb: FormBuilder,
  private auth: AuthService,
  private authGuardservice: AuthgaurdService,
  private router: Router,
  private ngZone: NgZone,
  private notifier:NotifierService
){}
ngOnInit(): void {
  this.signform = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstname:['',Validators.required],
    lastname:['',Validators.required]
  });
}
  hideshowpassword() {
    this.isText = !this.isText;
    this.isText
      ? (this.eyeicon = this.usericon.faEye)
      : (this.eyeicon = this.usericon.faEyeSlash);
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  onSignUp() {
    if (this.signform.valid) {
      console.log(this.signform.value);
      var formdata = new FormData();
      formdata.append('username', this.signform.value.username);
      formdata.append('password', this.signform.value.password);
      this.auth.login(formdata).subscribe({
        next: (res: any) => {
          if (res != null && res != '' && res != 'undefined') {
            alert(res.access_token);
            this.submited = false;
            this.signup_response = res;
            console.log(this.signup_response);
            if (this.signup_response.userRoleId != null) {
              //this.token = this.signup_response.access_token;
              localStorage.setItem(
                'muranu_tokenresponse',
                JSON.stringify(this.signup_response)
              );
              localStorage.setItem(
                'timer',
                JSON.stringify(
                  Date.now() + this.signup_response.expires_in * 1000
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
                this.signupbtn = 'Account Creating...';

                // if (targetScreen) {
                //   this.router.navigateByUrl(targetScreen);
                // } else {
                 this.notifier.notify('success', 'You Will Be Redirected Shortly to Login. Wait a Moment...')
                  this.ngZone.runOutsideAngular(() => {
                    setTimeout(() => {
                      // Use ngZone.run() to update Angular bindings inside setTimeout
                      this.ngZone.run(() => {
                        this.router.navigate(['/login']);
                      });
                    }, 3000); // 3000 milliseconds (3 seconds) delay
                  });

                //}
              }
            } else {
              //this.toastralert.toastrerror('Access not allowed for this user');
              this.signupbtn = 'Log In';
            }
          } else {
            //this.toastralert.toastrerror('Access not allowed for this user');
            this.signupbtn = 'Log In';
            this.submited = false;
          }
        },
        error: (err) => {
          alert(err?.error.message);
          this.signupbtn = 'Log In';
          this.submited = false;
        },
      });
    } else {
      console.log('required');
      ValidateForm.validateAllFormFields(this.signform);
    }
  }
}



