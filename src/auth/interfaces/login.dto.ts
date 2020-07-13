import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({
    description: 'API token',
    example: '9ad088b8f9b247db9e59289248b4c0d5c2b29074ef1e4c5290a5c0ba754444de'
  })
  @IsString()
  readonly token: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'Generated JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOWFkMDg4YjgtZjliMi00N2RiLTllNTktMjg5MjQ4YjRjMGQ1IiwibmFtZSI6IkJ1eWVyIHVzZXIiLCJyb2xlIjoiYnV5ZXIiLCJ0b2tlbiI6ImMwZDVjMmIyOTA3NGVmMWU0YzUyOTBhNWMwYmE3NTQ0NDRkZTlhZDA4OGI4ZjliMjQ3ZGI5ZTU5Mjg5MjQ4YjQifSwiaWF0IjoxNTk0NjQ3MTQ0LCJleHAiOjE1OTQ2NDgwNDR9.KAEQeXtOIPhLmL2miVBXrDEsgBNV5oJp8Yhtu4sJpUU'
  })
  @IsString()
  readonly access_token: string; // eslint-disable-line camelcase
}
