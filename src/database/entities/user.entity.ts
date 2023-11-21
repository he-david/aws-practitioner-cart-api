import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShopOrder } from './order.entity';
import { Cart } from './cart.entity';

@Entity()
export class ShopUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @OneToMany(() => ShopOrder, (order) => order.user, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'order_id' })
  orders: ShopOrder[];

  @OneToMany(() => Cart, (cart) => cart.user, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  carts: Cart[];
}
