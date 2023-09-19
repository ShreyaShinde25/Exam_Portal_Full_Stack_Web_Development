import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private login:LoginService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   //add the jwt token (Local Storage) request 
    let authReq= req; 
    const token= this.login.getToken();
    console.log("Inside interceptor");
    
     if(token!=null){
        //add token
        authReq=authReq.clone({setHeaders:{Authorization:`Bearer ${token}` },
    })

     }
     return next.handle(authReq);
    }

}

export const AuthInterceptorProviders=[
    {
        provide: HTTP_INTERCEPTORS, 
        useClass:AuthInterceptor,  //Use this class
        multi:true,
    },
];