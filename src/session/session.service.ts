import { Injectable } from '@nestjs/common';
import { User } from 'src/users/infrastructure/persistence/user';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { SessionRepository } from './infrastructure/persistence/session.repository';
import { Session } from './infrastructure/persistence/session';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  findOne(options: EntityCondition<Session>): Promise<NullableType<Session>> {
    return this.sessionRepository.findOne(options);
  }

  create(data: DeepPartial<Session>): Promise<Session> {
    return this.sessionRepository.create(data);
  }

  async softDelete(criteria: {
    id?: Session['id'];
    user?: Pick<User, 'id'>;
    excludeId?: Session['id'];
  }): Promise<void> {
    await this.sessionRepository.softDelete(criteria);
  }
}
