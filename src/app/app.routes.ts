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
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register.component').then((m) => m.RegisterComponent)
  },
  {
    path: 'events',
    loadComponent: () => import('./features/client/client-events/client-events.component').then((m) => m.ClientEventsComponent)
  },
  {
    path: 'account',
    loadComponent: () => import('./features/account/account.component').then((m) => m.AccountComponent)
  },
  {
    path: 'cart/:orderId',
    loadComponent: () => import('./features/client/client-cart/client-cart.component').then((m) => m.ClientCartComponent)
  },
  {
    path: 'booking/:id',
    loadChildren: () => import('./features/client/ticket-booking/ticket-booking.routes').then((d) => d.BOOKING_ROUTES)
  },
  {
    path: 'order/status/:id',
    loadComponent: () => import('./features/client/order-page/order-page.component').then((m) => m.OrderPageComponent)
  },
  {path: 'forbidden', component: ForbiddenComponent},
  {path: '**', component: PageNotFoundComponent},
];
