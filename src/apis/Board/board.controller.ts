import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  ParseUUIDPipe,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';

@ApiTags('게시판 API')
@Controller('/api/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /**
   * @description 게시판 생성
   *
   * @POST ("/api/board")
   *
   * @returns JSON
   */
  @Post()
  async create(@Body() input: CreateBoardInput) {
    return await this.boardService.create(input);
  }

  /**
   * @description 게시글 리스트 조회
   *
   * @GET ("/api/board")
   *
   * @returns JSON Array
   */
  @ApiQuery({
    name: 'lastOne-createAt',
    description: '게시글 리스트 마지막 요소의 createAt',
    type: Date,
    required: false,
  })
  @Get()
  async find(@Query('lastOne-createAt') last: Date) {
    return await this.boardService.find(last);
  }

  /**
   * @description 게시글 수정
   *
   * @PUT ("/api/board")
   *
   * @returns JSON
   */
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UpdateBoardInput,
  ) {
    return await this.boardService.update(id, input);
  }

  /**
   * @description 게시글 삭제
   *
   * @DELETE ("/api/board")
   *
   * @returns String
   */
  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() password: string,
  ) {
    return await this.boardService.delete(id, password);
  }
}
