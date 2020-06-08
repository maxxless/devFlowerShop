import { IOrder } from 'app/shared/model/order.model';
import { IColour } from 'app/shared/model/colour.model';
import { IFlower } from 'app/shared/model/flower.model';

export interface IFlowerInOrder {
  id?: number;
  amount?: number;
  order?: IOrder;
  colour?: IColour;
  flower?: IFlower;
}

export const defaultValue: Readonly<IFlowerInOrder> = {};
