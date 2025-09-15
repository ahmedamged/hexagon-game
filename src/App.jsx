import { useState } from "react";
import LineBetweenPoints from "./components/LineBetweenPoints";
import "./App.css";

let point1 = { x: null, y: null };
function App() {
  const [lines, setLines] = useState([]);
  const [firstClick, setFirstClick] = useState(true);

  const handleDotClick = (e) => {
    console.log(e.clientX, e.clientY);
    if (firstClick) {
      point1 = { x: e.clientX, y: e.clientY };
      setFirstClick((prev) => !prev);
    } else {
      const newLines = [...lines];
      let point2 = { x: e.clientX, y: e.clientY };
      newLines.push({ linep1: point1, linep2: point2 });
      setLines(newLines);
      setFirstClick((prev) => !prev);
    }
  };

  return (
    <>
      <div className="hexagon">
        <div className="first">
          <div className="dot" onClick={(e) => handleDotClick(e)}></div>
          <div className="dot" onClick={(e) => handleDotClick(e)}></div>
        </div>
        <div className="second">
          <div className="dot" onClick={(e) => handleDotClick(e)}></div>
          <div className="dot" onClick={(e) => handleDotClick(e)}></div>
        </div>
        <div className="third">
          <div className="dot" onClick={(e) => handleDotClick(e)}></div>
          <div className="dot" onClick={(e) => handleDotClick(e)}></div>
        </div>
        {lines.map((line, index) => (
          <LineBetweenPoints
            key={index}
            point1={line.linep1}
            point2={line.linep2}
          />
        ))}
      </div>
    </>
  );
}

export default App;
