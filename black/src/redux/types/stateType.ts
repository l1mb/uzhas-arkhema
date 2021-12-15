import IBasicProduct from "@/api/types/products/IBasicProduct";
import userDto from "@/api/types/user/userDto";

interface StateType {
  user: userDto;
  orders: { count: number };
  role: string;
  Products: IBasicProduct[];
}

export default StateType;
