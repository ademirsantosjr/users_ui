import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { constants } from '../constants/constants';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  const localData = localStorage.getItem(`${constants.localStorage.tokenDefinition}`);
  
  if (localData != null) {
    return true;
  } else {
    router.navigateByUrl(`/${constants.path.loginPage}`)
    return false;
  }
};
