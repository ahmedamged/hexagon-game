import { useState } from "react";
import LineBetweenPoints from "./components/LineBetweenPoints";
import "./App.css";

let point1 = { x: null, y: null };
let color = "";
let point1Number = 0;
let point2Number = 0;

function App() {
  const [lines, setLines] = useState([]);
  const [allTriangles, setAllTriangles] = useState([
    [
      [1, 2, ""],
      [2, 3, ""],
      [1, 3, ""],
    ],
    [
      [1, 2, ""],
      [2, 4, ""],
      [1, 4, ""],
    ],
    [
      [1, 2, ""],
      [2, 5, ""],
      [1, 5, ""],
    ],
    [
      [1, 2, ""],
      [2, 6, ""],
      [1, 6, ""],
    ],
    [
      [1, 3, ""],
      [3, 4, ""],
      [1, 4, ""],
    ],
    [
      [1, 3, ""],
      [3, 5, ""],
      [1, 5, ""],
    ],
    [
      [1, 4, ""],
      [4, 5, ""],
      [1, 5, ""],
    ],
    [
      [1, 4, ""],
      [4, 6, ""],
      [1, 6, ""],
    ],
    [
      [1, 5, ""],
      [5, 6, ""],
      [1, 6, ""],
    ],
    [
      [2, 3, ""],
      [3, 4, ""],
      [2, 4, ""],
    ],
    [
      [2, 3, ""],
      [3, 5, ""],
      [2, 5, ""],
    ],
    [
      [2, 3, ""],
      [3, 6, ""],
      [2, 6, ""],
    ],
    [
      [2, 4, ""],
      [4, 5, ""],
      [2, 5, ""],
    ],
    [
      [2, 4, ""],
      [4, 6, ""],
      [2, 6, ""],
    ],
    [
      [2, 5, ""],
      [5, 6, ""],
      [2, 6, ""],
    ],
    [
      [3, 4, ""],
      [4, 5, ""],
      [3, 5, ""],
    ],
    [
      [3, 4, ""],
      [4, 6, ""],
      [3, 6, ""],
    ],
    [
      [4, 5, ""],
      [5, 6, ""],
      [4, 6, ""],
    ],
  ]);
  const [firstClick, setFirstClick] = useState(true);
  const [isPlayer1, setIsPlayer1] = useState(true);
  const [loser, setLoser] = useState(null);

  const checkLoser = (newAllTriangles) => {
    newAllTriangles.map((triangle) => {
      if (
        triangle[0][2] === "maroon" &&
        triangle[1][2] === "maroon" &&
        triangle[2][2] === "maroon"
      ) {
        setLoser("Maroon");
      } else if (
        triangle[0][2] === "darkblue" &&
        triangle[1][2] === "darkblue" &&
        triangle[2][2] === "darkblue"
      ) {
        setLoser("Darkblue");
      }
    });
  };

  const changLineColor = (linePoints, color) => {
    allTriangles.map((triangle, index) => {
      triangle.map((line, lineIndex) => {
        if (linePoints[0] === line[0] && linePoints[1] === line[1]) {
          const newAllTriangles = [...allTriangles];
          newAllTriangles[index][lineIndex][2] = color;
          setAllTriangles(newAllTriangles);
          checkLoser(newAllTriangles);
        }
      });
    });
  };

  const handleDotClick = (e, num) => {
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
      changLineColor(linePoints, color);
    }
  };

  return (
    <>
      <h2>{loser ? `Loser is ${loser}` : "Keep Playing"}</h2>
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
