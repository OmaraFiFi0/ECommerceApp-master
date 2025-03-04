import { HttpInterceptorFn, withFetch } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService)
  
  //  Logic Req 
  return next(req).pipe(  catchError(    (err) => {
    // Logic Errors
    console.log('interceptors ' + err.error.message   )
    toastrService.error(err.error.message  , 'FreshCart')
    return throwError(   ()=>err     )
  }) )
  ;
};
