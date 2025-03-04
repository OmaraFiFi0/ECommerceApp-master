import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  // Logic Req   -------------- Send Headers

  if (localStorage.getItem('userToken')) {
    //  Api url cart , orders , wishlist
    if (req.url.includes('cart') || (req.url.includes('orders') || req.url.includes('wishlist'))) {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('userToken')!,
        },
      });
    }
  }
  
  return next(req);


};
