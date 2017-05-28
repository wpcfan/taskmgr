import { User } from './user';
import { Err } from './err';

export interface Auth {
  user?: User;
  err?: Err;
  token?: string;
}
