import { ItemDto } from './items.dto'

export class ShoplistDto {
  readonly name: string;
  readonly ownerId: string;
  readonly items: ItemDto[];
}

export class ShoplistQueryDto {
  readonly id?: string;
  readonly name?: string;
  readonly ownerId?: string;
  readonly items?: ItemDto[];
}

export class ShoplistUpsertDto {
  readonly id?: string;
  readonly name: string;
  readonly ownerId: string;
  readonly items?: ItemDto[];
}
