'use client';
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";

const TempPicker = () => {
  const [temperature, setTemperature] = useState(0);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const convertToFahrenheit = (celsius: number): number => (celsius * 9) / 5 + 32;
  const convertToCelsius = (fahrenheit: number): number => ((fahrenheit - 32) * 5) / 9;

  const getColor = (temp: number): string => {
    const normalizedTemp = (temp + 20) / 70; // Normalize -20 to 50 range into 0 to 1
    const red = Math.round(normalizedTemp * 255);
    const blue = 255 - red;
    return `rgb(${red}, 0, ${blue})`;
  };

  const handleTemperatureChange = (val: number): void => {
    if (isFahrenheit) {
      setTemperature(convertToCelsius(val));
    } else {
      setTemperature(val);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div
        className="w-40 h-40 rounded-md border"
        style={{ backgroundColor: getColor(temperature) }}
      ></div>
      
      {/* Toggle Switch */}
    <Toggle
        isOn={isFahrenheit}
        onChange={() => setIsFahrenheit(!isFahrenheit)}
        labelLeft="°C"
        labelRight="°F"
    />
      
      {/* Slider Control */}
      <Slider
        value={isFahrenheit ? convertToFahrenheit(temperature) : temperature}
        onChange={(val: number) => handleTemperatureChange(val)}
        min={isFahrenheit ? convertToFahrenheit(-20) : -20}
        max={isFahrenheit ? convertToFahrenheit(50) : 50}
        step={1}
      />
      
      {/* Number Input Control */}
      <input
        type="number"
        value={isFahrenheit ? convertToFahrenheit(temperature) : temperature}
        onChange={(e) => {
          const temp = parseInt(e.target.value, 10);
          if (!isNaN(temp)) {
            handleTemperatureChange(temp);
          }
        }}
        className="border p-2 w-20 text-center"
      />
    </div>
  );
};

export default TempPicker;
