export class ItemDto {
  readonly id: string;
  readonly name: string;
  readonly shoplistId: string;
}

export class ItemQueryDto {
  readonly id?: string;
  readonly name?: string;
  readonly shoplistId?: string;
}

export class ItemCreateDto {
  readonly id: string;
  readonly name: string;
  readonly shoplistId: string;
}

export class ItemUpdateDto {
  readonly id: string;
  readonly name?: string;
  readonly shoplistId?: string;
}
