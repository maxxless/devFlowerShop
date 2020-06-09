import Axios from 'axios';

export const getAccount = () => Axios.get('/api/account');
export const getAccountDetails = () => Axios.get('/api/account/details');
export const getAccountOrders = () => Axios.get('/api/account/orders');
export const getAccountDeliveries = () => Axios.get('api/account/deliveries');
