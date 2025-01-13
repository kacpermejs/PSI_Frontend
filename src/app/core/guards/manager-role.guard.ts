import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '@core/models/UserRole';
import { AuthService } from '@core/services/auth/auth.service';

export const managerRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.getRole() === UserRole.Manager) {
    return true;
  } else {
    router.navigate(['/forbidden']);
    return false;
  }

};
