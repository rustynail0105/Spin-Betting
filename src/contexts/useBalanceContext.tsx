import { createContext, useContext } from "react";

interface BalanceContextType {
  balance: number;
  setBalance: (bal: number) => void;
}

export const BalanceContext = createContext<BalanceContextType>({
  balance: 0,
  setBalance: () => {},
});

export const useBalanceContext = () => {
  return useContext(BalanceContext);
};
