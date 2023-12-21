import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Role } from '../infrastructure/persistence/role';

export class RoleDto implements Role {
  @ApiProperty()
  @IsNumber()
  id: number;
}
