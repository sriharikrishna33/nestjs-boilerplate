import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { FilterUserDto, SortUserDto } from '../../../../dto/query-user.dto';
import { User } from '../../user';
import { UserRepository } from '../../user.repository';
import { UserSchemaClass } from '../entities/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { DeepPartial } from 'src/utils/types/deep-partial.type';

@Injectable()
export class UsersDocumentRepository implements UserRepository {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly usersModel: Model<UserSchemaClass>,
  ) {}

  async create(createProfileDto: DeepPartial<User>): Promise<User> {
    const createdUser = new this.usersModel(createProfileDto);
    const userObject = await createdUser.save();
    return plainToInstance(UserSchemaClass, userObject.toJSON(), {
      groups: ['system'],
    });
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const where: EntityCondition<User> = {};
    if (filterOptions?.roles?.length) {
      where['role.id'] = {
        $in: filterOptions.roles.map((role) => role.id),
      };
    }

    const userObjects = await this.usersModel
      .find(where)
      .sort(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
              sort.order.toUpperCase() === 'ASC' ? 1 : -1,
          }),
          {},
        ),
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return userObjects.map((user) =>
      plainToInstance(UserSchemaClass, user.toJSON(), {
        groups: ['system'],
      }),
    );
  }

  async findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    if (fields.id) {
      const userObject = await this.usersModel.findById(fields.id);
      return plainToInstance(UserSchemaClass, userObject?.toJSON(), {
        groups: ['system'],
      });
    }

    const userObject = await this.usersModel.findOne(fields);
    return plainToInstance(UserSchemaClass, userObject?.toJSON(), {
      groups: ['system'],
    });
  }

  async update(
    id: User['id'],
    payload: DeepPartial<User>,
  ): Promise<User | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;
    delete clonedPayload._id;

    const filter = { _id: id };
    const userObject = await this.usersModel.findOneAndUpdate(
      filter,
      clonedPayload,
    );
    return plainToInstance(UserSchemaClass, userObject?.toJSON(), {
      groups: ['system'],
    });
  }

  async softDelete(id: User['id']): Promise<void> {
    await this.usersModel.deleteOne({
      _id: id,
    });
  }
}
