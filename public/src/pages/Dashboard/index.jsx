import { useContext, useEffect } from "react";
import { Card } from "../../components/Card";
import { Title } from "../../components/Typography";
import ServicesList from "./services";
import ActionButtons from "./actions";
import { ServiceProvider } from "../../contexts";

export default function () {
  return (
    <>
      <ServiceProvider>
        <Card>
          <Title>Interface de conexão</Title>

          <ServicesList />
        </Card>
      </ServiceProvider>
    </>
  );
}
