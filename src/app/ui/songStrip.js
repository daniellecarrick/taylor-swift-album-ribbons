"use client";

import { useState } from "react";
// async function previewUrl(id, token) {
//   const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const data = await response.json();
//   //console.log(data)
// }
export default function SongStrip({ r, g, b, a = 1, track, trackNo, id, token }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = (e) => {
    setShowTooltip(true);
   // previewUrl(id, token);
  };
  const handleMouseLeave = (e) => {
    setShowTooltip(false);
  };

  return (
    <div
      id={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="square hover:w-fit p-1 w-full h-28"
      style={{
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
       
        order: `${trackNo}`,
      }}
    >
      {/* to do --> only show title on hover. and play preview clip on hover. (do post launch?) */}

        {showTooltip ? (
          <div className="text-s w-min">
            <p>{track}</p>
            <p className="text-xs mt-1"><a href={`https://open.spotify.com/track/${id}`} target="_blank">play on spotify</a></p>
          </div>
        ) : null}
   
    </div>
  );
}
