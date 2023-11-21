import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartItem, Status } from '../../database/entities';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { switchMap } from 'rxjs';
import { Product } from '../models';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
    private readonly httpService: HttpService,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    try {
      console.log('FindByUserId: userId: ', userId);
      const cart = await this.cartRepo.findOne({
        where: { userId },
        relations: ['cartItems'],
      });
      console.log('FindByUserId: cart: ', cart);
      return cart;
    } catch (err) {
      console.error('FindByUserId: error: ', err);
      return null;
    }
  }

  async createByUserId(userId: string) {
    try {
      await this.cartRepo.insert({ userId, status: Status.OPEN });
      return await this.findByUserId(userId);
    } catch (err) {
      console.error('createByUserId: error: ', err);
      return null;
    }
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);
    console.log('findOrCreateByUserId: userCart: ', userCart);

    if (userCart) {
      return userCart;
    }
    return await this.createByUserId(userId);
  }

  async updateCartItemByUserId(userId: string, cartItem: CartItem): Promise<Cart> {
    try {
      await this.cartItemRepo.update({ id: cartItem.id }, cartItem);
      return await this.findByUserId(userId);
    } catch (err) {
      console.error('updateCartItemByUserId: error: ', err);
      return null;
    }
  }

  async updateCartByUserId(userId: string, cart: Cart): Promise<Cart> {
    try {
      await this.cartRepo.update({ userId: userId }, cart);
      return await this.findByUserId(userId);
    } catch (err) {
      console.error('updateCartByUserId: error: ', err);
      return null;
    }
  }

  async removeByUserId(userId): Promise<void> {
    try {
      const cart = await this.findByUserId(userId);
      await Promise.all(cart.cartItems.map((item) => this.cartItemRepo.remove(item)));
    } catch (err) {
      console.error('removeByUserId: error: ', err);
      return null;
    }
  }

  async getProducts(): Promise<Product[]> {
    const resp = await this.httpService.axiosRef.get<{ products: Product[] }>(
      'https://3z9hj3o1z9.execute-api.us-east-1.amazonaws.com/dev/products',
    );
    return resp.data.products;
  }
}
