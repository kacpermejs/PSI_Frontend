import {UserRole} from '@core/models/UserRole';

export interface UserCustom {
    email: string;
    name: string;
    family_name: string;
    birthdate: string;
    phone_number: string;
    role: UserRole;
}
