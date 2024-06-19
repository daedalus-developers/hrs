"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1 className="text-4xl text-center">{count}</h1>
        <Button onClick={() => setCount(count + 1)} color="primary" size="lg">
          Increment
        </Button>
      </div>
    </>
  );
}

export default Counter;
