import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../entities/file.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FileRepository } from '../../file.repository';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class FileRelationalRepository implements FileRepository {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async create(data: Omit<FileEntity, 'id'>): Promise<FileEntity> {
    return this.fileRepository.save(this.fileRepository.create(data));
  }

  findOne(
    fields: EntityCondition<FileEntity>,
  ): Promise<NullableType<FileEntity>> {
    return this.fileRepository.findOne({
      where: fields as FindOptionsWhere<FileEntity>,
    });
  }
}
