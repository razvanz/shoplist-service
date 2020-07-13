import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ItemDto {
  @ApiProperty({
    description: 'Item\'s ID'
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: 'The name of the item'
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The shoplist\'s ID to which the item belongs to'
  })
  @IsString()
  readonly shoplistId: string;
}

export class ItemQueryDto {
  @IsString()
  readonly id?: string;

  @ApiProperty({
    description: 'The name of the item'
  })
  @IsString()
  readonly name?: string;

  @ApiProperty({
    description: 'The shoplist\'s ID to which the item belongs to'
  })
  @IsString()
  readonly shoplistId?: string;
}

export class ItemCreateDto {
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: 'The name of the item'
  })
  @IsString()
  readonly name: string;

  @IsString()
  readonly shoplistId: string;
}

export class ItemUpdateDto {
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: 'The name of the item'
  })
  @IsString()
  readonly name?: string;

  @IsString()
  readonly shoplistId?: string;
}
