import { useContext } from "react";
import { ShopContext } from "../providers/storeProvider";

const useStore = () => {
  return useContext(ShopContext);
};

export { useStore };
