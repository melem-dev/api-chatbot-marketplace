import { Card } from "../../components/Card";
import { Title } from "../../components/Typography";
import ServicesList from "./services";
import InterfaceConn from "./conn";

import { ServiceProvider } from "../../contexts";

export default function () {
  return (
    <>
      <ServiceProvider>
        <Card>
          <Title>Interface de conexão</Title>

          <ServicesList />
        </Card>

        <InterfaceConn />
      </ServiceProvider>
    </>
  );
}
