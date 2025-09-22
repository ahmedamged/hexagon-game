import { useRef, useState } from "react";
import LineBetweenPoints from "./components/LineBetweenPoints";
import "./App.css";

let point1 = { x: null, y: null };
let color = "";
let point1Number = 0;
let point2Number = 0;
function App() {
  const initialTriangles = [
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
      [1, 3, ""],
      [3, 6, ""],
      [1, 6, ""],
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
      [3, 5, ""],
      [5, 6, ""],
      [3, 6, ""],
    ],
    [
      [4, 5, ""],
      [5, 6, ""],
      [4, 6, ""],
    ],
  ];
  const [lines, setLines] = useState([]);
  const [linesDrawn, setLinesDrawn] = useState([]);
  const [allTriangles, setAllTriangles] = useState(initialTriangles);
  const [firstClick, setFirstClick] = useState(true);
  const [isPlayer1, setIsPlayer1] = useState(true);
  const [loser, setLoser] = useState(null);
  const [lock, setLock] = useState(false);
  const dotsRefs = useRef([]);

  const checkLoser = (newAllTriangles) => {
    newAllTriangles.map((triangle) => {
      if (
        triangle[0][2] === "maroon" &&
        triangle[1][2] === "maroon" &&
        triangle[2][2] === "maroon"
      ) {
        setLoser("Maroon");
        setLock(true);
      } else if (
        triangle[0][2] === "darkblue" &&
        triangle[1][2] === "darkblue" &&
        triangle[2][2] === "darkblue"
      ) {
        setLoser("Darkblue");
        setLock(true);
      }
    });
  };

  const changeLineColor = (linePoints, color) => {
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

  const checkToDrawLine = (linePoints) => {
    let drawLine = true;
    if (linesDrawn.length === 0) {
      return true;
    } else {
      for (let line of linesDrawn) {
        if (linePoints[0] === line[0] && linePoints[1] === line[1]) {
          drawLine = false;
        }
      }
      return drawLine;
    }
  };

  const handleDotClick = (e, num) => {
    if (lock) {
      return;
    }
    if (firstClick) {
      if (dotsRefs.current[num - 1]) {
        const rect = dotsRefs.current[num - 1].getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        point1 = { x: centerX, y: centerY };
      }
      point1Number = num;
      setFirstClick((prev) => !prev);
    } else {
      let point2;
      if (dotsRefs.current[num - 1]) {
        const rect = dotsRefs.current[num - 1].getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        point2 = { x: centerX, y: centerY };
      }
      point2Number = num;
      if (point1Number === point2Number) {
        return;
      }
      const linePoints = [point1Number, point2Number];
      linePoints.sort();
      if (checkToDrawLine(linePoints)) {
        const newlinesDrawn = [...linesDrawn];
        newlinesDrawn.push(linePoints);
        if (isPlayer1) {
          color = "darkblue";
          setIsPlayer1((prev) => !prev);
        } else {
          color = "maroon";
          setIsPlayer1((prev) => !prev);
        }
        setLinesDrawn(newlinesDrawn);
        const newLines = [...lines];
        newLines.push({
          linep1: point1,
          linep2: point2,
          color,
        });
        setLines(newLines);
        changeLineColor(linePoints, color);
      }
      setFirstClick((prev) => !prev);
    }
  };

  const handleResetGame = () => {
    setLock(false);
    setLines([]);
    setLinesDrawn([]);
    setAllTriangles(initialTriangles);
    setFirstClick(true);
    setIsPlayer1(true);
    setLoser(null);
  };

  return (
    <>
      <h2 className={loser ? `hithere ${loser}` : ""}>
        {loser ? `Loser is ${loser}` : "Keep Playing"}
      </h2>

      <div className="hexagon">
        <div className="first">
          <div
            className="dot"
            ref={(el) => {
              dotsRefs.current[1] = el;
            }}
            onClick={(e) => handleDotClick(e, 2)}
          ></div>
          <div
            className="dot"
            ref={(el) => {
              dotsRefs.current[2] = el;
            }}
            onClick={(e) => handleDotClick(e, 3)}
          ></div>
        </div>
        <div className="second">
          <div
            className="dot"
            ref={(el) => {
              dotsRefs.current[0] = el;
            }}
            onClick={(e) => handleDotClick(e, 1)}
          ></div>
          <div
            className="dot"
            ref={(el) => {
              dotsRefs.current[3] = el;
            }}
            onClick={(e) => handleDotClick(e, 4)}
          ></div>
        </div>
        <div className="third">
          <div
            className="dot"
            ref={(el) => {
              dotsRefs.current[5] = el;
            }}
            onClick={(e) => handleDotClick(e, 6)}
          ></div>
          <div
            className="dot"
            ref={(el) => {
              dotsRefs.current[4] = el;
            }}
            onClick={(e) => handleDotClick(e, 5)}
          ></div>
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
      <p className="description">
        Try to avoid making a triangle with your color
      </p>
      <p className="fyi">&#40; Two players only &#41;</p>
      <button className="reset-btn" onClick={handleResetGame}>
        Reset Game
      </button>
    </>
  );
}

export default App;
