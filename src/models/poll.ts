import { User } from './user';

export interface Poll {
  id: number;
  pollName: string;
  createdUser: User;
}
