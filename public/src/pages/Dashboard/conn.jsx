import { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { FlexCenter, FlexCenterColumn } from "../../components/Layout";
import { Subtitle } from "../../components/Typography";
import { TransporterContext } from "../../contexts";
import { QrBox } from "../../components/Qr";

const charOneAtUpperCase = (string) => {
  let transform = (el) =>
    el.charAt(0).toUpperCase() + el.substring(1, el.length).toLowerCase();

  const matches = string.split(" ").map(transform).join(" ");

  return matches;
};

const interfaceState = {
  generated: false,
  type: "",
  data: "",
};

export default function () {
  const { ws } = useContext(TransporterContext);
  const [data, setData] = useState(interfaceState);

  useEffect(() => {
    ws.on("service_request", ({ type, data }) => {
      setData({
        generated: true,
        type,
        data,
      });
    });
  }, [ws]);

  useEffect(() => {
    return () => {
      setData(interfaceState);
    };
  }, []);

  return (
    <Card>
      <FlexCenter>
        {!data.generated && <Subtitle fadeInOut>Gerando Sessão</Subtitle>}

        {data.generated && (
          <>
            {data.type === "whats app" && (
              <FlexCenterColumn>
                <Subtitle>{charOneAtUpperCase(data.type)}</Subtitle>

                <QrBox value={data.data} />
              </FlexCenterColumn>
            )}
          </>
        )}
      </FlexCenter>
    </Card>
  );
}
