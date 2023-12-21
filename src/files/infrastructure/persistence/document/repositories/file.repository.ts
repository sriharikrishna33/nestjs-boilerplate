import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { FileRepository } from '../../file.repository';
import { FileSchemaClass } from '../entities/file.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileType } from '../../file';
import { plainToInstance } from 'class-transformer';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class FileDocumentRepository implements FileRepository {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    @InjectModel(FileSchemaClass.name)
    private fileModel: Model<FileSchemaClass>,
  ) {}

  async create(data: Omit<FileType, 'id'>): Promise<FileType> {
    const createdFile = new this.fileModel(data);
    const fileObject = await createdFile.save();
    return plainToInstance(FileSchemaClass, fileObject.toJSON(), {
      groups: ['system'],
    });
  }

  async findOne(
    fields: EntityCondition<FileType>,
  ): Promise<NullableType<FileType>> {
    if (fields.id) {
      const fileObject = await this.fileModel.findById(fields.id);
      return plainToInstance(FileSchemaClass, fileObject?.toJSON(), {
        groups: ['system'],
      });
    }

    const userObject = await this.fileModel.findOne(fields);
    return plainToInstance(FileSchemaClass, userObject?.toJSON(), {
      groups: ['system'],
    });
  }
}
