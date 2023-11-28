import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
//private baseUrl:string="https://devapis.d9.software/api/token"
  constructor(private http:HttpClient) { }

  login(formdata:any){
    return this.http.post<any>(environment.tokenUrl,formdata)
  }
}
