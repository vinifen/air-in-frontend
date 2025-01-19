import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserSessionHandlerService } from '../services/user-session-handler.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const userSession = inject(UserSessionHandlerService);
  const router = inject(Router);
  
  const isInitialized = await firstValueFrom(userSession.getIsInitialized());
console.log("RODOU AUTH GUARD", isInitialized);
  if (!isInitialized) {
   
    const checkUser = await userSession.checkUserSession();
    console.log(checkUser, "RODOU QUANDO NAO ESTIVER INICIALIZADO");
    if (!checkUser.status) {
      return true; 
    }
    return router.parseUrl('/'); 
  }

  const isLogged = await firstValueFrom(authService.getIsLogged());
  if (!isLogged) {
    console.log("ROUDOU QUANDO ESTIVER INICIALIZADO");
    return true; 
  }
console.log("ROUDOU QUANDO ESTIVER INICIALIZADO");
  return false; 
};
