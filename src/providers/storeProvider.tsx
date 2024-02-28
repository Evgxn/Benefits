import { observer } from "mobx-react-lite";
import { PropsWithChildren, createContext } from "react";
import store from "../stores/store";

interface storeProviderProps extends PropsWithChildren {}

const ShopContext = createContext(store);

const StoreProvider: React.FC<storeProviderProps> = observer(({ children }) => {
  return <ShopContext.Provider value={store}>{children}</ShopContext.Provider>;
});

export default StoreProvider;
export { ShopContext };
