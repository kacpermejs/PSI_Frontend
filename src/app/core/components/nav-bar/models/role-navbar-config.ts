import {UserRole} from "@core/models/UserRole";

export const ROLE_NAVBAR_CONFIG = {
  [UserRole.Client]: [
    {label: 'Events', route: '/events'},
    {label: 'Cart', route: '/cart'},
    {label: 'Account', route: '/account'},
  ],
  [UserRole.Manager]: [
    {label: 'Events', route: '/manager/events'},
    {label: 'Account', route: '/account'},
  ],
  [UserRole.Employee]: [
    {label: 'Events', route: '/employee/events'},
    {label: 'Cart', route: '/cart'},
    {label: 'Account', route: '/account'},
  ],
  [UserRole.Guest]: [
    {label: 'Events', route: '/events'},
    {label: 'Login', route: '/login'},
    {label: 'Register', route: '/register'},
  ],
};
