"use client";
import Image from "next/image";
import { useState } from "react";

export default function SongSwatch({ r, g, b, a = 1, track, trackNo, id }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = (e) => {
    setShowTooltip(true);
  };
  const handleMouseLeave = (e) => {
    setShowTooltip(false);
  };

  return (
    <div
      id={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="songStrip hover:w-fit p-1 grow h-28"
      style={{
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,

        order: `${trackNo}`,
      }}
    >
      {showTooltip ? (
        <div className="text-s">
          <p>{track}</p>
          <p className="text-xs mt-1">
            <a href={`https://open.spotify.com/track/${id}`} target="_blank">
              <Image src="/play-button.svg" width={15} height={15} className="inline mr-1"/>
              Spotify
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
}
