import { Routes } from '@angular/router';

export const MANAGER_ROUTES: Routes = [
  {
    path: 'events',
    loadComponent: () =>
      import('./manager-events/manager-events.component').then(
        (m) => m.ManagerEventsComponent
      ),
  },
];
