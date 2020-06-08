import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IPacking } from 'app/shared/model/packing.model';
import { IDelivery } from 'app/shared/model/delivery.model';

export interface IOrder {
  id?: number;
  totalPrice?: number;
  date?: Moment;
  user?: IUser;
  packing?: IPacking;
  delivery?: IDelivery;
}

export const defaultValue: Readonly<IOrder> = {};
