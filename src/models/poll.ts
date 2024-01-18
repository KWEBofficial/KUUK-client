interface User {
  displayName: string;
}

export interface Poll {
  id: number;
  pollName: string;
  createdUser: User;
  createdAt: Date;
  endedAt: Date;
}
