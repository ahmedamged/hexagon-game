import { useState } from "react";
import LineBetweenPoints from "./components/LineBetweenPoints";
import "./App.css";

let point1 = { x: null, y: null };
let color = "";
let point1Number = 0;
let point2Number = 0;
function App() {
  const [lines, setLines] = useState([]);
  const [firstClick, setFirstClick] = useState(true);
  const [isPlayer1, setIsPlayer1] = useState(true);

  const handleDotClick = (e, num) => {
    console.log(e.clientX, e.clientY);
    if (firstClick) {
      point1 = { x: e.clientX, y: e.clientY };
      point1Number = num;
      setFirstClick((prev) => !prev);
    } else {
      let point2 = { x: e.clientX, y: e.clientY };
      point2Number = num;
      if (isPlayer1) {
        color = "darkblue";
        setIsPlayer1((prev) => !prev);
      } else {
        color = "maroon";
        setIsPlayer1((prev) => !prev);
      }
      const newLines = [...lines];
      const linePoints = [point1Number, point2Number];
      linePoints.sort();
      newLines.push({
        linePoints,
        linep1: point1,
        linep2: point2,
        color,
      });
      setLines(newLines);
      setFirstClick((prev) => !prev);
    }
  };

  return (
    <>
      <div className="hexagon">
        <div className="first">
          <div className="dot" onClick={(e) => handleDotClick(e, 2)}></div>
          <div className="dot" onClick={(e) => handleDotClick(e, 3)}></div>
        </div>
        <div className="second">
          <div className="dot" onClick={(e) => handleDotClick(e, 1)}></div>
          <div className="dot" onClick={(e) => handleDotClick(e, 4)}></div>
        </div>
        <div className="third">
          <div className="dot" onClick={(e) => handleDotClick(e, 6)}></div>
          <div className="dot" onClick={(e) => handleDotClick(e, 5)}></div>
        </div>
        {lines.map((line, index) => (
          <LineBetweenPoints
            key={index}
            point1={line.linep1}
            point2={line.linep2}
            stroke={line.color}
          />
        ))}
      </div>
    </>
  );
}

export default App;
