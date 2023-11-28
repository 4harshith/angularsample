import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserProfileService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService implements CanActivate {
  str: any;
  token_response: any;
  userRole: any;
  isAuthenticated:any = "";
  constructor(private router: Router, private userService: UserProfileService) { }

  authguard() {
    localStorage.setItem("IsUser_loggedin", "userloggedin");
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.str = localStorage.getItem("IsUser_loggedin");
    this.isAuthenticated = localStorage.getItem("isAuthenticated");
    this.token_response = JSON.parse(localStorage.getItem("muranu_tokenresponse") || '{}');
    this.userRole = this.token_response.UserRoleName;
    if (this.str == "userloggedin" && this.isAuthenticated == "true") {
      // console.log(state.url);
      if (route.data['role'] && route.data['role'].indexOf(this.userRole) === -1) {
        if(this.userRole == 'Owner' || this.userRole == 'Administrator'){
          return true;
        }
        else{
          return false;
        }
      }
      return true;
    }
    else {
      this.userService.setTargetScreen(state.url);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
