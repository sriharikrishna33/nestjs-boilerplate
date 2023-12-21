import { Session } from 'src/session/infrastructure/persistence/session';

export type JwtRefreshPayloadType = {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
