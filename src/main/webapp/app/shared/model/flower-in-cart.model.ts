import { ICart } from 'app/shared/model/cart.model';
import { IColour } from 'app/shared/model/colour.model';
import { IFlower } from 'app/shared/model/flower.model';

export interface IFlowerInCart {
  id?: number;
  amount?: number;
  cart?: ICart;
  colour?: IColour;
  flower?: IFlower;
}

export const defaultValue: Readonly<IFlowerInCart> = {};
