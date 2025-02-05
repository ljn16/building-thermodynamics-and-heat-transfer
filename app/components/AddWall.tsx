import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddWall({ wallTypes, setWallTypes }) {
  const [newWall, setNewWall] = useState({ name: "", thickness: 1, color: "#000000", heatTransfer: 1.0 });

  const addCustomWall = () => {
    if (newWall.name && !wallTypes.some(w => w.name === newWall.name)) {
      setWallTypes([...wallTypes, newWall]);
      setNewWall({ name: "", thickness: 1, color: "#000000", heatTransfer: 1.0 });
    }
  };

  return (
    <div className="mt-2 border-t pt-2">
      <h3>Add Custom Wall Type</h3>
      <label>Name: <input type="text" value={newWall.name} onChange={(e) => setNewWall({ ...newWall, name: e.target.value })} /></label>
      <label>Thickness: <input type="number" value={newWall.thickness} onChange={(e) => setNewWall({ ...newWall, thickness: Number(e.target.value) })} /></label>
      <label>Color: <input type="color" value={newWall.color} onChange={(e) => setNewWall({ ...newWall, color: e.target.value })} /></label>
      <label>Heat Transfer Rate: <input type="number" step="0.1" value={newWall.heatTransfer} onChange={(e) => setNewWall({ ...newWall, heatTransfer: Number(e.target.value) })} /></label>
      <Button onClick={addCustomWall}>Add Wall Type</Button>
    </div>
  );
}