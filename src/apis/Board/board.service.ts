import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  Repository,
  Not,
  MoreThan,
  Equal,
  LessThan,
  Raw,
} from 'typeorm';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { BoardEntity } from './entities/board.entity';
import * as bcrypt from 'bcrypt';
import { BoardDto } from './dto/board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,

    private readonly datasource: DataSource,
  ) {}

  async create(input: CreateBoardInput) {
    const { password, title, content } = input;

    // 제목 길이 검증
    if (title.length > 20) {
      throw new HttpException(
        '제목은 최대 20자 까지만 작성할 수 있습니다.',
        412,
      );
    }
    // 본문 길이 검증
    if (content.length > 200) {
      throw new HttpException(
        '본문은 최대 200자 까지만 작성할 수 있습니다.',
        412,
      );
    }
    // 비밀번호 검증
    const reg = /^(?=.*?[0-9]).{6,}$/;
    if (!reg.test(password)) {
      throw new HttpException(
        '비밀번호 형식은 최소 6자, 숫자 포함 입니다.',
        412,
      );
    }
    const hashed = await bcrypt.hash(password, 3);

    const result = await this.boardRepository.save({
      title,
      content,
      password: hashed,
    });
    return new BoardDto(result);
  }

  async find(last: Date) {
    if (!last) {
      const result = await this.boardRepository.find({
        order: {
          createAt: 'DESC',
        },
        take: 20,
      });
      return result.map((e) => new BoardDto(e));
    }

    const queryBuilder = this.datasource.createQueryBuilder(
      BoardEntity,
      'board',
    );
    const result = await queryBuilder
      .where({
        createAt: LessThan(last),
      })
      .orderBy('board.createAt', 'DESC')
      .take(20)
      .getMany();
    // const result = await this.boardRepository.find({
    //   where: {
    //     createAt: LessThan(last),
    //   },
    // });

    return result.map((e) => new BoardDto(e));
  }

  async update(id: string, input: UpdateBoardInput) {
    const prev = await this.boardRepository.findOneBy({ id });

    if (prev) {
      const { password, ...rest } = input;
      const isCorrect = await bcrypt.compare(password, prev.password);
      if (!isCorrect) {
        throw new UnauthorizedException('비밀번호가 틀렸습니다.');
      }
      const result = await this.boardRepository.save({
        ...prev,
        ...rest,
      });

      return new BoardDto(result);
    } else {
      throw new HttpException('', 204);
    }
  }

  async delete(id: string, password: string) {
    const prev = await this.boardRepository.findOneBy({ id });

    if (prev) {
      const isCorrect = await bcrypt.compare(password, prev.password);
      if (!isCorrect) {
        throw new UnauthorizedException('비밀번호가 틀렸습니다.');
      }
      const result = await this.boardRepository.delete({ id });
      if (result.affected) {
        return '게시글 삭제';
      }
    } else {
      throw new HttpException('', 204);
    }
  }
}
