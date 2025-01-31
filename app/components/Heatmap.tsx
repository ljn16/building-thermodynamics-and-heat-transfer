import React from "react";

type HeatmapProps = {
  data: number[];  // e.g. [0.1, 0.5, 1, ...]
};

export function Heatmap({ data }: HeatmapProps) {
  // Example logic: map data values to a blue→red scale.
  // Adjust to match your data range (0–1, or 0–100, etc.).
  // For each item, we create a small square.

  return (
    <div className="flex flex-wrap gap-2">
      {data.map((value, index) => {
        // Let's assume data range is 0 (cool) to 1 (hot).
        // We can map that to an HSL color from blue (240deg) to red (0deg).
        const hue = 240 - value * 240;
        const color = `hsl(${hue}, 100%, 50%)`;

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