import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  token_response: any;
  token: any;
  private targetScreen: string | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.token_response = JSON.parse(localStorage.getItem("muranu_tokenresponse") || '{}');
    this.token = this.token_response.access_token;
  }

  setTargetScreen(url: string): void {
    this.targetScreen = url;
  }
 
  getTargetScreen(): string {
    return this.targetScreen ?? ''; // If targetScreen is undefined, return an empty string
  }

  userAuthentication(formData: any) {
    return this.http.post(environment.tokenUrl, formData).pipe(map((res: any) => {
      return res;
    }), catchError(error => {
      console.log(error);
      return throwError(error);
    }));
  }

  // LoginWithAuthentication(formData: any) {
  //   return this.http.post(environment.LoginWithAuthentication, formData).pipe(map((res: any) => {
  //     return res;
  //   }), catchError(error => {
  //     console.log(error);
  //     return throwError(error);
  //   }));
  // }

  forgotpswd(email: any) {
    const httpOptions = {
      responseType: 'text',
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    }
    return this.http.post(environment.PostForgotPassword + '?email=' + email, httpOptions).pipe(map((res: any) => {
      return res;
    }), catchError(error => {
      console.log(error);
      return throwError(error);
    }));
  }

  // GetUserCode(email: any) {
  //   return this.http.get(environment.GetUserCode + '/' + email, {
  //     responseType: 'text',
  //   }).pipe(map((res: any) => {
  //     return res;
  //   }), catchError(error => {
  //     console.log(error);
  //     return throwError(error);
  //   }));
  // }

  // GetSetEmailSentforForgotPassword(userId: any, tenantId: any) {
  //   return this.http.get(environment.GetSetEmailSentforForgotPassword + '/' + userId + '/' + tenantId, {
  //     responseType: 'text',
  //   }).pipe(map((res: any) => {
  //     return res;
  //   }), catchError(error => {
  //     console.log(error);
  //     return throwError(error);
  //   }));
  // }

  // resetpassword(passworddetails: any) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': 'Bearer ' + this.token
  //     })
  //   }
  //   return this.http.post(environment.ResetPassword, passworddetails, httpOptions).pipe(map((res: any) => {
  //     return res;
  //   }), catchError(error => {
  //     return error;
  //   }));
  // }

  // GetMenusByUserProfileIdAndUserRoleId(UserProfileId: any, timeLogId: any) {
  //   return this.http.get(environment.GetMenusByUserProfileIdAndUserRoleId + '/' + UserProfileId + '/' + timeLogId)
  //     .pipe(map((res: any) => {
  //       return res;
  //     }), catchError(error => {
  //       console.log(error);
  //       return throwError(error);
  //     }));
  // }

  // GetDefaultTenantPermissions(tenantProfileId: any, UserProfileId: any, projectId: any) {
  //   return this.http.get(environment.GetDefaultTenantPermissions + '/' + tenantProfileId + '/' + UserProfileId + '/' + projectId)
  //     .pipe(map((res: any) => {
  //       return res;
  //     }), catchError(error => {
  //       console.log(error);
  //       return throwError(error);
  //     }));
  // }

  // SaveOrUpdateDefaultTenantPermissions(accesspermissions: any) {
  //   //console.log(Userdetails)
  //   return this.http.post(environment.SaveOrUpdateDefaultTenantPermissions, accesspermissions, {
  //     responseType: 'text'
  //   }).pipe(map((res: any) => {
  //     return res;
  //   }), catchError(error => {
  //     console.log(error);
  //     return throwError(error);
  //   }));
  // }

}
