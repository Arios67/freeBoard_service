import { OmitType } from '@nestjs/swagger';
import { BoardEntity } from '../entities/board.entity';

export class BoardDto extends OmitType(BoardEntity, ['password']) {
  constructor(board: BoardEntity) {
    super();
    this.id = board.id,
    this.title = board.title,
    this.content = board.content;
    this.createAt = board.createAt;
  }
}
