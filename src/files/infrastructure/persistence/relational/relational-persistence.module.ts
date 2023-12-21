import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { FileRepository } from '../file.repository';
import { FileRelationalRepository } from './repositories/file.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [
    {
      provide: FileRepository,
      useClass: FileRelationalRepository,
    },
    ConfigModule,
    ConfigService,
  ],
  exports: [FileRepository],
})
export class RelationalFilePersistenceModule {}
