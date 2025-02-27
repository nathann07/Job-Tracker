import React, { useState } from "react";

const HoverButton = ({ message, hoverMessage, classes, action }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`${classes}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={action}
    >
      {isHovered ? hoverMessage : message}
    </button>
  );
};

export default HoverButton;
