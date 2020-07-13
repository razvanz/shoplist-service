import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User, UserRole } from '../entities/user.entity'
import {
  UserDto,
  UserQueryDto
} from '../interfaces/users.dto'

@Injectable()
export class UsersService {
  // Hardcoded system users
  private readonly users = [
    {
      id: '66fdd9b3-d63e-40dd-9da1-e13d51c2139c',
      name: 'Client user',
      role: UserRole.Client,
      token: '9ad088b8f9b247db9e59289248b4c0d5c2b29074ef1e4c5290a5c0ba754444de'
    },
    {
      id: '9ad088b8-f9b2-47db-9e59-289248b4c0d5',
      name: 'Buyer user',
      role: UserRole.Buyer,
      token: 'c0d5c2b29074ef1e4c5290a5c0ba754444de9ad088b8f9b247db9e59289248b4'
    }
  ]

  constructor (
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
    this.userRepository.save(this.users[0])
    this.userRepository.save(this.users[1])
  }

  async listUsers (query: UserQueryDto): Promise<UserDto[]> {
    return this.userRepository.find(query)
  }
}
