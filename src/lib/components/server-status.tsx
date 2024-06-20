"use client";

import { api } from "@utils/client";
import { useState, useEffect } from "react";

type Props = {
  serverStatus: string;
  pageLoadTime: string;
};

function ServerStatus({
  serverStatus = "Loading....",
  pageLoadTime = "",
}: Props) {
  const [status, _] = useState(serverStatus);

  const [serverTime, setServerTime] = useState(pageLoadTime);

  useEffect(() => {
    const eventSource = new EventSource(api.time.$url().href);

    console.log(api.time.$url().href);

    eventSource.onopen = () => {
      console.log("Connected to server time");
    };

    eventSource.onmessage = (event) => {
      console.log(event);
      setServerTime(event.data);
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="text-2xl flex flex-col">
      <p>Daedalus {status}</p>
      <p>Current server time: {serverTime}</p>
    </div>
  );
}

export default ServerStatus;
