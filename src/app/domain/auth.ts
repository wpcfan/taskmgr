import { User } from './user';
import { Err } from './err';

export interface Auth {
  user: User | null;
  userId: string | null;
  err: string | null;
  token: string | null;
}
