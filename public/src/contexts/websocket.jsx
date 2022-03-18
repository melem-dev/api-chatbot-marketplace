import { createContext, useEffect, useState } from "react";
import ws from "../transporter";

export const TransporterContext = createContext();

export const TransporterProvider = ({ children }) => {
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    ws.on("welcome", () => setConnection(true));
  }, []);

  const globalValues = { ws, connection };

  return (
    <TransporterContext.Provider value={globalValues}>
      {children}
    </TransporterContext.Provider>
  );
};
