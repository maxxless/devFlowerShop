import { IUser } from 'app/shared/model/user.model';

export interface ICart {
  id?: number;
  totalPriceWithoutDiscount?: number;
  cardDiscount?: number;
  bonusDiscount?: number;
  finalPrice?: number;
  user?: IUser;
}

export const defaultValue: Readonly<ICart> = {};
