import { User } from './user';
import { Err } from './err';

export interface Auth {
  user?: User;
  userId?: string;
  err?: Err;
  token?: string;
}
