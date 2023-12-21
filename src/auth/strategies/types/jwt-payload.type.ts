import { Session } from 'src/session/infrastructure/persistence/session';
import { User } from 'src/users/infrastructure/persistence/user';

export type JwtPayloadType = Pick<User, 'id' | 'role'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
