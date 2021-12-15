import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import getToken from "./getToken";

const getUserId = (): string => {
  const token = getToken();
  let role = "";
  try {
    if (token) {
      const decoded = jwtDecode(token);
      role += decoded.id;
    }
  } catch (e) {
    toast.error(`${e}`);
  }
  // console.log(`role ${role}`);
  return role;
};

export default getUserId;
