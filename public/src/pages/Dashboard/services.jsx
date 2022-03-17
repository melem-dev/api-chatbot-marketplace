import { useContext, useState } from "react";
import { List, Item } from "../../components/List";
import { Text, Bold } from "../../components/Typography";
import { ServiceContext } from "../../contexts";

export default function () {
  const { Services } = useContext(ServiceContext);

  return (
    <>
      <List>
        <Item>
          <Text>
            Websocket: <Bold>{Services.Websocket}</Bold>
          </Text>
        </Item>
        <Item>
          <Text>
            Whats App: <Bold>{Services["Whats App"]}</Bold>
          </Text>
        </Item>
        <Item>
          <Text>
            Telegram: <Bold>{Services.Telegram}</Bold>
          </Text>
        </Item>
      </List>
    </>
  );
}
