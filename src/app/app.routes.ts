import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './features/page-not-found/page-not-found.component';
import {managerRoleGuard} from '@core/guards/manager-role.guard';
import {ForbiddenComponent} from './features/forbidden/forbidden.component';

export const routes: Routes = [
  {path: '', redirectTo: '/events', pathMatch: 'full'},
  {
    path: 'manager',
    canActivate: [managerRoleGuard],
    loadChildren: () =>
      import('./features/manager/manager.routes').then((m) => m.MANAGER_ROUTES),
  },
  {
    path: 'events',
    loadComponent: () => import('./features/client/client-events/client-events.component').then((m) => m.ClientEventsComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/client/client-cart/client-cart.component').then((m) => m.ClientCartComponent)
  },
  {path: 'forbidden', component: ForbiddenComponent},
  {path: '**', component: PageNotFoundComponent},
];
