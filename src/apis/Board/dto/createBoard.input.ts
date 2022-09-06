import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BoardEntity } from '../entities/board.entity';

export class CreateBoardInput extends OmitType(BoardEntity, [
  'id',
  'createAt',
]) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '제목',
  })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '본문',
  })
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'abcdef1',
    description: '게시글 비밀번호',
    required: true,
  })
  readonly password: string;
}
