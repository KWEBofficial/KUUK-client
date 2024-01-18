interface User {
  displayName: string;
}

export interface Poll {
  pollName: string;
  createdUser: User;
  createdAt: Date;
  endedAt: Date;
}
