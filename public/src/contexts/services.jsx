import { createContext, useContext, useEffect, useState } from "react";
import { TransporterContext } from "./websocket";

export const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const { ws } = useContext(TransporterContext);

  const initialStates = {};

  const [modal, setModal] = useState(false);
  const [Services, setServices] = useState(initialStates);
  const [room, setRoom] = useState(false);

  useEffect(() => {
    ws.emit("join_room", { room: "services" });

    ws.on("accept_in_room", ({ room }) => {
      setRoom(room);

      ws.emit("check_services");
    });

    ws.on("services_status", (data) => {
      for (let service in data) {
        setServices((prevState) => {
          const newState = { ...prevState };
          newState[service] = data[service];
          return newState;
        });
      }
    });

    ws.on("services_change_status", () => {
      ws.emit("check_services");
    });
  }, [ws]);

  const handleModal = () => {
    setModal((prevState) => !prevState);
  };

  const globalValues = { ws, Services, room, modal, handleModal };

  return (
    <ServiceContext.Provider value={globalValues}>
      {children}
    </ServiceContext.Provider>
  );
};
