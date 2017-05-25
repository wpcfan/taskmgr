export interface Err {
  timestamp?: Date;
  status?: number;
  error?: string;
  exception?: string;
  message?: string;
  path?: string;
}

export interface Auth {
  user?: User;
  err?: Err;
  token?: string;
}

export interface Address {
  id?: number;
  province: string;
  city: string;
  district: string;
  street?: string;
}

export enum IdentityType {
  IdCard = 0,
  Insurance,
  Passport,
  DriverLicense,
  ResidenceBooklet,
  SpecialDistrict,
  Military,
  Soldier,
  Civilian,
  Other
}

export interface Identity {
  identityNo: string;
  identityType: IdentityType;
}

export interface UserProfile {
  userId: string;
  addrs: Address[];
  serials: Identity[];
  dateOfBirth: Date;
}

export interface User {
  id?: string;
  email: string;
  name?: string;
  password?: string;
  avatar?: string;
  projectIds?: string[];
  taskIds?: string[];
  address?: Address;
  dateOfBirth?: Date;
  identity?: Identity;
}

export interface Quote {
  id?: string;
  cn: string;
  en: string;
  pic: string;
}

export interface Task {
  id?: string;
  taskListId: string;
  desc: string;
  completed: boolean;
  owner?: User;
  ownerId: string;
  participantIds: string[];
  participants?: User[];
  dueDate?: Date;
  priority: number;
  // order: number;
  remark?: string;
  // tags?: string[];
  reminder?: Date;
  createDate?: Date;
}

export interface TaskList {
  id?: string;
  name: string;
  projectId: string;
  order: number;
  taskIds?: string[];
}

export interface Project {
  id?: string;
  name: string;
  desc?: string;
  coverImg?: string;
  enabled?: boolean;
  taskLists?: string[]; // 存储 TaskList ID
  members?: string[]; // 存储成员 key 为 ID， value 为角色
}
