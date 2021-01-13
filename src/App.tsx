import React, { useState, useEffect } from "react";
import CommonProvider from "@/states/common";

import { apolloSetClient } from "@/apollo/apollo-set-server";
import { getQSInfo } from "@/utils";
import Dotdotdot from "@/components/Loading/Dotdotdot";

function App() {
  const [client, setClient] = useState(undefined as any);

  let QS = getQSInfo();
  console.log(QS, " - - - - - - this is QS");

  let token: string = QS["token"] || "";
  let api: string = QS["api"];

  let _client = apolloSetClient({
    api,
    token,
  });

  useEffect(() => {
    setClient(_client);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     document.title = "cra workbox!";
  //   }, 3000);
  // }, []);

  if (!client) {
    return <Dotdotdot />;
  }

  return (
    <div className="App">
      <CommonProvider client={client} />
    </div>
  );
}

export default App;
