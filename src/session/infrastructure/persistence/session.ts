import { User } from 'src/users/infrastructure/persistence/user';

export class Session {
  _id?: string;
  id: number | string;
  user: User;
  createdAt: Date;
  deletedAt: Date;
}
