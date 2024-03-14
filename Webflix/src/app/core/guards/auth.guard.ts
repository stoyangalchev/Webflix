import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../feature/services/user.service';


export const canActivate : CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if(userService.isLoggedIn){
    return true;
  }

  router.navigate(["/404"]);
  return false;
};

export const canNotActivate : CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if(!userService.isLoggedIn){
    return true;
  }
  
  router.navigate(["/404"]);
  return false;
};

export const  canManipulate: CanActivateFn = (route, state) => {
  let canManipulate = false;
  const router = inject(Router);

  const isOwner = router.getCurrentNavigation()?.extras.state?.["isOwner"];

  if(isOwner){
    canManipulate = true
  }

  return canManipulate;
};
