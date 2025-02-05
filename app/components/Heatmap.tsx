import React from "react";

type HeatmapProps = {
  data: number[];
};

export function Heatmap({ data }: HeatmapProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {data.map((value, index) => {
        const normalizedTemp = (value /* + 20 */) / 100/* 70 */; // Normalize -20 to 50 range into 0 to 1
        const red = Math.round(normalizedTemp * 255);
        const blue = 255 - red;

        const color = `rgb(${red}, 0, ${blue})`;

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
