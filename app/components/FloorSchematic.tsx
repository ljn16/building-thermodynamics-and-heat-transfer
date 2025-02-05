/* FloorSchematic.js */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AddWall from "./AddWall";

const initialWallTypes = [
  { name: "Brick", thickness: 2, color: "#8B0000", heatTransfer: 1.0 },
  { name: "Wood", thickness: 1, color: "#A0522D", heatTransfer: 0.5 },
  { name: "Concrete", thickness: 3, color: "#808080", heatTransfer: 1.5 }
];

export default function FloorSchematic() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [wallTypes, setWallTypes] = useState(initialWallTypes);
  const [selectedWall, setSelectedWall] = useState(wallTypes[0]);
  const [walls, setWalls] = useState(new Map());

  const handleWallChange = (event) => {
    const newWall = wallTypes.find(w => w.name === event.target.value);
    if (newWall) {
      setSelectedWall(newWall);
    }
  };

  const toggleWall = (x, y) => {
    const key = `${x},${y}`;
    setWalls((prev) => {
      const newWalls = new Map(prev);
      if (newWalls.has(key)) {
        newWalls.delete(key);
      } else {
        newWalls.set(key, selectedWall);
      }
      return newWalls;
    });
  };

  return (
    <div className="p-4">
      <Card>
        <CardContent className="flex flex-col gap-2">
          <label>Floor Width: <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} /></label>
          <label>Floor Height: <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} /></label>
          <label>Wall Type:
            <select onChange={handleWallChange} value={selectedWall.name}>
              {wallTypes.map((wall) => (
                <option key={wall.name} value={wall.name}>{wall.name} (Thickness: {wall.thickness}, Heat: {wall.heatTransfer})</option>
              ))}
            </select>
          </label>
          <AddWall wallTypes={wallTypes} setWallTypes={setWallTypes} />
        </CardContent>
      </Card>

      <div className="mt-4 grid" style={{ gridTemplateColumns: `20px repeat(${width}, 20px)` }}>
        {[...Array(width)].map((_, x) => (
          <div key={`col-${x}`} className="text-center text-xs">{x}</div>
        ))}
        {[...Array(height)].map((_, y) => (
          <>
            <div key={`row-${y}`} className="text-right text-xs pr-1">{y}</div>
            {[...Array(width)].map((_, x) => {
              const wall = walls.get(`${x},${y}`);
              return (
                <div
                  key={`${x},${y}`}
                  className="w-5 h-5 border border-gray-300"
                  style={{ backgroundColor: wall ? wall.color : "#ffffff" }}
                  onClick={() => toggleWall(x, y)}
                ></div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
};
