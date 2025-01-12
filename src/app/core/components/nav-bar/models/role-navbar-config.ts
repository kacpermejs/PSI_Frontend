import { UserRole } from "@core/models/UserRole";

export const ROLE_NAVBAR_CONFIG = {
  [UserRole.Client]: [
    { label: 'Events', route: '/events' },
    { label: 'Account', route: '/account' },
  ],
  [UserRole.Manager]: [
    { label: 'Events', route: '/manager/events' },
    { label: 'Account', route: '/account' },
  ],
  [UserRole.Employee]: [
    { label: 'Events', route: '/employee/events' },
    { label: 'Account', route: '/account' },
  ],
};