import React from "react";

const LineBetweenPoints = ({ point1, point2, stroke }) => {
  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
    >
      <line
        x1={point1.x}
        y1={point1.y}
        x2={point2.x}
        y2={point2.y}
        stroke={stroke}
        strokeWidth="10"
      />
    </svg>
  );
};

export default LineBetweenPoints;
