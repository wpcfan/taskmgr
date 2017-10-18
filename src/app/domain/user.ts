export enum IdentityType {
  IdCard = 0,
  Insurance,
  Passport,
  Military,
  Other
}

export interface Address {
  id?: number;
  province: string;
  city: string;
  district: string;
  street?: string;
}

export interface Identity {
  identityNo: string | null;
  identityType: IdentityType | null;
}

export interface User {
  id: string | undefined;
  username: string;
  name?: string;
  password?: string;
  avatar?: string;
  address?: Address;
  dateOfBirth?: string;
  identity?: Identity;
}
