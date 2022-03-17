import { useContext, useEffect } from "react";
import { Card } from "../../components/Card";
import { Title } from "../../components/Typography";
import ServicesList from "./services";
import ActionButtons from "./actions";
import { TransporterContext, ServiceProvider } from "../../contexts";

export default function () {
  const { ws } = useContext(TransporterContext);

  useEffect(() => {
    ws.on("welcome", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <>
      <ServiceProvider>
        <Card>
          <Title>Interface de conexão</Title>

          <ServicesList />

          <ActionButtons />
        </Card>
      </ServiceProvider>
    </>
  );
}
