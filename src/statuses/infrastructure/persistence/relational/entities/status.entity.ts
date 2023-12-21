import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Status } from '../../status';

@Entity({
  name: 'status',
})
export class StatusEntity extends EntityRelationalHelper implements Status {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  id: number;

  @Allow()
  @ApiProperty({ example: 'Active' })
  @Column()
  name?: string;
}
