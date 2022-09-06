import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { BoardEntity } from '../entities/board.entity';

export class UpdateBoardInput extends OmitType(BoardEntity, [
  'id',
  'createAt',
]) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: '제목',
    required: false,
  })
  readonly title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: '본문',
    required: false,
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
