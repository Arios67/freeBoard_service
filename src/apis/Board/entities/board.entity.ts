import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'board' })
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: 'string', description: 'id' })
  id: string;

  @Column('varchar', { length: 20 })
  @ApiProperty({ type: 'string', maxLength: 20, description: '제목' })
  title: string;

  @Column('varchar', { length: 200 })
  @ApiProperty({ type: 'string', maxLength: 200, description: '본문' })
  content: string;

  @Column()
  @ApiProperty({ type: 'string', description: '게시글 비밀번호 (수정 불가)' })
  password: string;

  @CreateDateColumn()
  createAt: Date;
}
