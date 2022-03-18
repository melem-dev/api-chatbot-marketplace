import { useContext } from "react";
import { List, Item } from "../../components/List";
import { Text, Bold } from "../../components/Typography";
import { ServiceContext, TransporterContext } from "../../contexts";
import { Button } from "../../components/Button";
import { Flex } from "../../components/Layout";

export default function () {
  const { ws, connection } = useContext(TransporterContext);
  const { Services, room } = useContext(ServiceContext);

  const onDesactive = (target) => {
    ws.emit("disconnect_service", { target });
  };

  const onActive = (target) => {
    ws.emit("connect_service", { target });
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
        <Item>
          <Flex>
            <Text>
              Whats App: <Bold>{Services["Whats App"]}</Bold>
            </Text>
            {Services["Whats App"] === "connected" ? (
              <Button>Sair</Button>
            ) : (
              <Button>Conectar</Button>
            )}
          </Flex>
        </Item>
        <Item>
          <Flex>
            <Text>
              Telegram: <Bold>{Services.Telegram}</Bold>
            </Text>
            {Services.Telegram === "connected" ? (
              <Button>Sair</Button>
            ) : (
              <Button>Conectar</Button>
            )}
          </Flex>
        </Item>
      </List>
    </>
  );
}
