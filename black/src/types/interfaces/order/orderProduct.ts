interface OrderProduct {
  id: number;
  name: string;
  status: string;
  vendor: string;
  price: string;
  userId?: number;
  rentStartDate: string;
  rentEndDate: string;
}
export default OrderProduct;
