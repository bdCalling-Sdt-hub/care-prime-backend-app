import { Model, Types } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';

interface IAuthenticationProps {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
}

export type IUser = {
    name: string;
    appId: string;
    role: USER_ROLES;
    email: string;
    password: string;
    profile: string;
    verified: boolean;
    isSubscribed: boolean;
    authentication?: IAuthenticationProps;
}

export type UserModal = {
    isExistUserById(id: string): any;
    isExistUserByEmail(email: string): any;
    isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;