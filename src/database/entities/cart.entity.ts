import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { ShopUser } from './user.entity';
import { ShopOrder } from './order.entity';

export enum Status {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => ShopUser)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: ShopUser;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  @Column({ type: 'enum', enum: Status, nullable: false })
  status: Status;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  cartItems: CartItem[];

  @OneToMany(() => ShopOrder, (order) => order.cart)
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  orders: ShopOrder[];
}
