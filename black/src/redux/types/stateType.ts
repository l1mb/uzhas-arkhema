import userDto from "@/api/types/user/userDto";

interface StateType {
  user: userDto;
  orders: { count: number };
  role: string;
  Products: updateProductDto[];
}

export default StateType;
