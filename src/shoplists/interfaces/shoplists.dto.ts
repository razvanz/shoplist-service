import { IsString, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { ItemDto } from './items.dto'

export class ShoplistDto {
  @ApiProperty({
    description: 'Shoplist\'s ID'
  })
  @IsString()
  readonly id?: string;

  @ApiProperty({
    description: 'The name of the shoplist'
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The ID user which is the shoplist owner'
  })
  @IsString()
  readonly ownerId: string;

  @ApiProperty({
    description: 'Shoplist\'s items',
    type: [ItemDto]
  })
  @ValidateNested()
  readonly items: ItemDto[];
}

export class ShoplistQueryDto {
  @IsString()
  readonly id?: string;

  @ApiProperty({
    description: 'The name of the shoplist'
  })
  @IsString()
  readonly name?: string;

  @ApiProperty({
    description: 'The ID user which is the shoplist owner'
  })
  @IsString()
  readonly ownerId?: string;

  @ValidateNested()
  readonly items?: ItemDto[];
}

export class ShoplistUpsertDto {
  @IsString()
  readonly id?: string;

  @ApiProperty({
    description: 'The name of the shoplist'
  })
  @IsString()
  readonly name: string;

  @IsString()
  readonly ownerId?: string;

  @ValidateNested()
  readonly items?: ItemDto[];
}
