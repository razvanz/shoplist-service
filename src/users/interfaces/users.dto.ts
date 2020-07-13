export class UserDto {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly token: string;
}

export class UserQueryDto {
  readonly id?: string;
  readonly token?: string;
}
