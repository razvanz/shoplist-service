import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Item } from './item.entity'

@Entity()
export class Shoplist {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ length: 36 })
   ownerId: string;

   @Column({ length: 64 })
   name: string;

   @OneToMany(() => Item, item => item.shoplist)
   items: Item[];
}
