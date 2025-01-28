// export interface User {
//     email: string;
//     password: string;
//     name: string;
//     family_name: string;
//     code: string;
//     showPassword: boolean;
// }

import {UserRole} from '@core/models/UserRole';

export interface User {
    email: string;
    password: string;
    name: string;
    family_name: string;
    birthdate: string;
    phone_number: string;
    role: UserRole;
    code: string;
    showPassword: boolean;
}
