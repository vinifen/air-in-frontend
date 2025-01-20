import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError, from, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { UserSessionHandlerService } from '../services/user-session-handler.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('INTERCEPTOR ACTIVATED');
  const publicRoutes = [
    { url: '/authentication', methods: ['POST', 'GET'] },
    { url: '/cities-weather/public', methods: ['POST'] },
    { url: '/auth/logout', methods: ['POST'] },
    { url: '/auth/refresh-token', methods: ['POST'] },
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => req.url.includes(route.url) && route.methods.includes(req.method)
  );

  if (isPublicRoute) {
    console.log('Public route detected, skipping verification:', req.url);
    return next(req);
  }

  const userSessionHandler = inject(UserSessionHandlerService);

  console.log('Protected route detected, adding authentication logic...');

  return next(req).pipe(
    tap((response: any) => {
      console.log('Response received:', response);
    }),
    switchMap((response: any) => {
      const responseBody = response.body;

      if (responseBody?.status === false && responseBody.data?.stStatus === false && responseBody.data?.hasRt === true) {
        console.log('Token inválido ou expirado, tentando renovar...');

        return from(userSessionHandler.handlerErrorRequest(responseBody)).pipe(
          switchMap((resultAuth: any) => {
            if (resultAuth.status === true && resultAuth.newSession === true) {
              const requestAgain = req.clone();
              console.log('Token renovado, reenviando requisição:', requestAgain);
              return next(requestAgain);
            } else {
              console.error('Sessão expirada ou erro ao renovar o token');
              return throwError(() => new Error('Session expired or token renewal failed'));
            }
          })
        );
      }

      return from(Promise.resolve(response)); 
    }),
    catchError((error) => {
      console.error('Error caught in the interceptor:', error);

      return throwError(() => error);
    })
  );
};
