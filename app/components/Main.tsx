'use client';
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Heatmap } from "@/components/Heatmap";

import FloorSchematic from "@/components/FloorSchematic";
import TempPicker from "./TempPicker";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



export default function Main() {
  const [temperatureData, setTemperatureData] = useState<number[]>([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  const [flowRate, setFlowRate] = useState(1);

  // Connect to Socket
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "", {
      transports: ["websocket"],
    });

    socket.on("temperature_update", (data: number[]) => {
      setTemperatureData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const updateFlowRate = (value: number) => {
    setFlowRate(value);
    // potentially emit to socket or call an API, etc ...
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <Card className="max-w-lg w-full">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Airflow & Heat Transfer</h2>
          <Heatmap data={temperatureData} />
        </CardContent>
      </Card>

      <div className="flex flex-col items-center gap-2">
        <p>Adjust Airflow Rate</p>
        <Slider
          min={0}
          max={10}
          step={0.1}
          value={flowRate}
          onChange={(val) => updateFlowRate(val)}
        />
        <Button onClick={() => console.log("Recalculate logic here")}>
          Recalculate
        </Button>
      </div>
      <FloorSchematic />
      <TempPicker />
    </div>
  );
}