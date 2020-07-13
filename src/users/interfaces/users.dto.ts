import { IsString, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from '../entities/user.entity'

export class UserDto {
  @ApiProperty({
    description: 'User ID'
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: 'User full name'
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: `
      User's role:

      - client user: can only see and edit his shoplists
      - buyer user: can see all shoplists but cannot edit
    `,
    enum: UserRole
  })
  @IsEnum(UserRole)
  readonly role: UserRole;

  @ApiProperty({
    description: 'User API token'
  })
  @IsString()
  readonly token: string;
}

export class UserQueryDto {
  @ApiProperty({
    description: 'User ID'
  })
  @IsString()
  readonly id?: string;

  @ApiProperty({
    description: 'User API token'
  })
  @IsString()
  readonly token?: string;
}
