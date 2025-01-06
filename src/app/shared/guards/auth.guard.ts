import { CanActivateFn, Router } from '@angular/router';
import { IsLoggedService } from '../services/is-logged.service';
import { UsersService } from '../services/users.service';
import { RequestSessionTokenService } from '../services/request-session-token.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const isLogged = inject(IsLoggedService);
  return isLogged.getIsLogged().pipe(
    map(logged => {
      console.log(logged);
     return !logged;
    })
  );
};
