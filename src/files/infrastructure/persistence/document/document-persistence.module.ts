import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema, FileSchemaClass } from './entities/file.schema';
import { FileRepository } from '../file.repository';
import { FileDocumentRepository } from './repositories/file.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileSchemaClass.name, schema: FileSchema },
    ]),
  ],
  providers: [
    {
      provide: FileRepository,
      useClass: FileDocumentRepository,
    },
    ConfigModule,
    ConfigService,
  ],
  exports: [FileRepository],
})
export class DocumentFilePersistenceModule {}
