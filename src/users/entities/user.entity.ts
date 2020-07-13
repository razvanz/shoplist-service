import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export enum UserRole {
  Client = 'client',
  Buyer = 'buyer'
}

@Entity()
export class User {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ length: 512 })
   name: string;

   @Column({ length: 32 })
   role: UserRole;

   @Column({ length: 64 })
   token: string;
}
