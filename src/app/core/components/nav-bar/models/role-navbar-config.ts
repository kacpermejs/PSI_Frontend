import {UserRole} from "@core/models/UserRole";

export enum ButtonType {
  None = 'none',
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger'
}

export interface NavbarConfig {
  label: string;
  route: string;
  button?: ButtonType;
}

export const ROLE_NAVBAR_CONFIG: Record<UserRole, NavbarConfig[]> = {
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
    {label: 'Sign in', route: '/login', button: ButtonType.Primary},
  ],
};
