import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { ErrorService } from './shared/error-message/error.service';



@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private router: Router, private errorService: ErrorService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    req = req.clone({
      withCredentials: true,
    });


    return next.handle(req).pipe(
      catchError((err) => {
        if(err.status === 404){
          this.router.navigate(["/404"])
        }else{
          this.errorService.setError(err);
        }

        return [err];
      })
    );
  }
}

export const appInterceptorProvider: Provider = {
  multi: true,
  useClass: AppInterceptor,
  provide: HTTP_INTERCEPTORS,
};