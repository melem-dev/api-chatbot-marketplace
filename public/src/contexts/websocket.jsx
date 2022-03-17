import { createContext } from "react";
import ws from "../transporter";

export const TransporterContext = createContext();

export const TransporterProvider = ({ children }) => {
  const globalValues = { ws };

  return (
    <TransporterContext.Provider value={globalValues}>
      {children}
    </TransporterContext.Provider>
  );
};
