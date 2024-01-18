import { User } from './user';
import { Restaurant } from './restaurant';
import Candidate from './candidate';

interface Poll {
  id: number;
  pollName: string;
  createdAt: Date;
  url: string;
  endedAt?: Date | null;
  createdUser: User;
}

export interface PollFormData {
  poll: Poll;
  candidates: Candidate[];
  restaurants: Restaurant[];
}
