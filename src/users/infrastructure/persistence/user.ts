import { FileType } from 'src/files/infrastructure/persistence/file';
import { Role } from 'src/roles/infrastructure/persistence/role';
import { Status } from 'src/statuses/infrastructure/persistence/status';

export class User {
  _id?: string;
  id: number | string;
  email: string | null;
  password: string;
  previousPassword: string;
  provider: string;
  socialId: string | null;
  firstName: string | null;
  lastName: string | null;
  photo?: FileType | null;
  role?: Role | null;
  status?: Status;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
