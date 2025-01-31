'use client';
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heatmap } from "@/components/Heatmap";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
if (!socketUrl) {
  throw new Error("NEXT_PUBLIC_SOCKET_URL is not defined");
}
const socket = io(socketUrl);

export default function AirflowApp() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [flowRate, setFlowRate] = useState(1);
  
  useEffect(() => {
    socket.on("temperature_update", (data) => {
      setTemperatureData(data);
    });
    return () => {
      socket.off("temperature_update");
    };
  }, []);

  const updateFlowRate = (value) => {
    setFlowRate(value);
    socket.emit("set_flow_rate", value);
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <Card className="w-full max-w-lg">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Airflow & Heat Transfer</h2>
          <Heatmap data={temperatureData} />
        </CardContent>
      </Card>
      <div className="flex flex-col items-center gap-2">
        <p>Adjust Airflow Rate</p>
        <Slider min={0} max={10} step={0.1} value={flowRate} onChange={updateFlowRate} />
        <Button onClick={() => socket.emit("recalculate")}>Recalculate</Button>
      </div>
    </div>
  );
}