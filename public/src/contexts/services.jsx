import { createContext, useContext, useEffect, useState } from "react";
import { TransporterContext } from "./websocket";

export const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const { ws } = useContext(TransporterContext);

  const initialStates = {
    Telegram: "loading",
    "Whats App": "loading",
    Websocket: "disconnected",
  };

  const [Services, setServices] = useState(initialStates);

  const UpdateService = (service, status) => {
    setServices((prevState) => {
      const newState = { ...prevState };
      newState[service] = status;
      return newState;
    });
  };

  useEffect(() => {
    ws.on("welcome", (data) => UpdateService("Websocket", "connected"));
  }, []);

  const globalValues = { ws, Services };

  return (
    <ServiceContext.Provider value={globalValues}>
      {children}
    </ServiceContext.Provider>
  );
};
