import { useContext } from "react";
import { List, Item } from "../../components/List";
import { Text, Bold } from "../../components/Typography";
import { ServiceContext, TransporterContext } from "../../contexts";
import { Button } from "../../components/Button";
import { Flex } from "../../components/Layout";

export default function () {
  const serviceStatus = {
    100: "Iniciando Client",
    102: "Autenticando",
    200: "Conectado",
    403: "Desconectado",
  };

  const { ws, connection } = useContext(TransporterContext);
  const { Services, room, handleModal } = useContext(ServiceContext);

  const ServicesList = Object.keys(Services);

  const setDisconnect = (target) => {
    return ws.emit("disconnect_service", { target });
  };

  const setConnect = (target) => {
    ws.emit("connect_service", { target });
    return handleModal();
  };

  const HandleButton = ({ target: el }) => {
    console.log(Services[el]);
    const actived = Services[el] === "200";
    const onClick = () => (actived ? setDisconnect(el) : setConnect(el));
    return <Button onClick={onClick}>{actived ? "Sair" : "Conectar"}</Button>;
  };

  return (
    <>
      <List>
        <Item>
          <Flex>
            <Text>
              Websocket:
              <Bold>{connection ? "connected" : "disconnected"}</Bold>
            </Text>
            <Text />
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Text>
              Room: <Bold>{room}</Bold>
            </Text>
            <Text />
          </Flex>
        </Item>
        {ServicesList.map((el, i) => (
          <Item key={i}>
            <Flex>
              <Text>
                {el}: <Bold>{serviceStatus[Services[el]]}</Bold>
              </Text>
              <HandleButton target={el} />
            </Flex>
          </Item>
        ))}
      </List>
    </>
  );
}
