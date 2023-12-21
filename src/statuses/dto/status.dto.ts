import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../infrastructure/persistence/status';
import { IsNumber } from 'class-validator';

export class StatusDto implements Status {
  @ApiProperty()
  @IsNumber()
  id: number;
}
