import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class password {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  readonly password: string;
}
