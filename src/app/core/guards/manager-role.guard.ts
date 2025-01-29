import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {UserRole} from '@core/models/UserRole';
import {ControlService} from '@core/services/control/control.service';
import {map, tap} from 'rxjs/operators';

export const managerRoleGuard: CanActivateFn = (route, state) => {
  const controlService = inject(ControlService);
  const router = inject(Router);
  return true; //todo
  // return controlService.getRole().pipe(
  //   map(role => role === UserRole.Manager),
  //   tap(isManager => {
  //     if (!isManager) {
  //       router.navigate(['/forbidden']);
  //     }
  //   })
  // );
};
