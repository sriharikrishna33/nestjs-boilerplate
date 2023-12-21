import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SessionRepository } from '../../session.repository';
import { Session } from '../../session';
import { SessionSchemaClass } from '../entities/session.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/users/infrastructure/persistence/user';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';

@Injectable()
export class SessionDocumentRepository implements SessionRepository {
  constructor(
    @InjectModel(SessionSchemaClass.name)
    private sessionModel: Model<SessionSchemaClass>,
  ) {}

  async findOne(
    options: EntityCondition<Session>,
  ): Promise<NullableType<Session>> {
    const clonedOptions = { ...options };
    if (clonedOptions.id) {
      clonedOptions._id = clonedOptions.id.toString();
      delete clonedOptions.id;
    }

    const sessionObject = await this.sessionModel.findOne(clonedOptions);

    return plainToInstance(SessionSchemaClass, sessionObject?.toJSON());
  }

  async create(data: DeepPartial<Session>): Promise<Session> {
    const createdSession = new this.sessionModel(data);
    const sessionObject = await createdSession.save();
    return plainToInstance(SessionSchemaClass, sessionObject.toJSON());
  }

  async softDelete({
    excludeId,
    ...criteria
  }: {
    id?: Session['id'];
    user?: Pick<User, 'id'>;
    excludeId?: Session['id'];
  }): Promise<void> {
    const transformedCriteria = {
      user: criteria.user?.id,
      _id: criteria.id
        ? criteria.id
        : excludeId
          ? { $not: { $eq: excludeId } }
          : undefined,
    };
    await this.sessionModel.deleteMany(transformedCriteria);
  }
}
