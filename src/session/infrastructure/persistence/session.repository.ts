import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Session } from './session';
import { User } from 'src/users/infrastructure/persistence/user';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

export abstract class SessionRepository {
  abstract findOne(
    options: EntityCondition<Session>,
  ): Promise<NullableType<Session>>;

  abstract create(data: DeepPartial<Session>): Promise<Session>;

  abstract softDelete({
    excludeId,
    ...criteria
  }: {
    id?: Session['id'];
    user?: Pick<User, 'id'>;
    excludeId?: Session['id'];
  }): Promise<void>;
}
