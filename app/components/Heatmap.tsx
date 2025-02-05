import React from "react";

type HeatmapProps = {
  data: number[];
};

export function Heatmap({ data }: HeatmapProps) {
  // LOGIC: map data values to a blue→red scale. ... adjust to match data range (0–1, 0–100, etc)    // for each item (i.e., local tempature (?)), create a square

  return (
    <div className="flex flex-wrap gap-2">
      {data.map((value, index) => {
        const hue = 240 - (value / 100) * 240;  // assuming value is in the range 0-100°C, map value to a color (0°C = blue, 50°C = gray, 100°C = red)
        const color = `hsl(${hue}, 100%, 50%)`; // map to an HSL color from blue (240deg) to red (0deg)

        return (
          <div
            key={index}
            className="w-6 h-6"
            style={{ backgroundColor: color }}
            title={`Value: ${value}`}
          />
        );
      })}
    </div>
  );
}