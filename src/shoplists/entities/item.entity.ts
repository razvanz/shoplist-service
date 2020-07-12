import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Shoplist } from './shoplist.entity'

@Entity()
export class Item {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ length: 64 })
   name: string;

   @ManyToOne(() => Shoplist, shoplist => shoplist.items)
   @JoinColumn()
   shoplist: Shoplist;

   @Column({ nullable: false })
   shoplistId: string;
}
