'use client'

import { useState } from "react";

export default function Square({ r, g, b, track, trackNo }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleMouseEnter = (e) => {
    setShowTooltip(true);
  };
  const handleMouseLeave = (e) => {
    setShowTooltip(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="square p-1 grow w-full"
      style={{
        backgroundColor: `rgb(${r} ${g} ${b})`,
        height: 100,
        order: `${trackNo}`,
      }}
    >
      {/* to do --> only show title on hover. and play preview clip on hover. (do post launch?) */}
      <p className="opacity-60">{showTooltip ? track : null}</p>
    </div>
  );
}
