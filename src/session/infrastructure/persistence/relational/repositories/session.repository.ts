import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Not, Repository } from 'typeorm';
import { SessionEntity } from '../entities/session.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { SessionRepository } from '../../session.repository';
import { Session } from '../../session';
import { User } from 'src/users/infrastructure/persistence/user';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';

@Injectable()
export class SessionRelationalRepository implements SessionRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}

  async findOne(
    options: EntityCondition<Session>,
  ): Promise<NullableType<Session>> {
    return this.sessionRepository.findOne({
      where: options as FindOptionsWhere<SessionEntity>,
    });
  }

  async create(data: DeepPartial<Session>): Promise<Session> {
    return this.sessionRepository.save(
      this.sessionRepository.create(data as DeepPartial<SessionEntity>),
    );
  }

  async softDelete({
    excludeId,
    ...criteria
  }: {
    id?: Session['id'];
    user?: Pick<User, 'id'>;
    excludeId?: Session['id'];
  }): Promise<void> {
    await this.sessionRepository.softDelete({
      ...(criteria as {
        id?: SessionEntity['id'];
        user?: Pick<UserEntity, 'id'>;
      }),
      id: criteria.id
        ? (criteria.id as SessionEntity['id'])
        : excludeId
          ? Not(excludeId as SessionEntity['id'])
          : undefined,
    });
  }
}
