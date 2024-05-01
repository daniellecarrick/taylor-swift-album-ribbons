export default function Square({ r, g, b, track, trackNo }) {
  return (
    // <div style={{backgroundColor:`hsl(${h} ${s}% ${l}%)`}} width={30} height={30}>{track}</div>
    <div
      className="square p-1 text-wrap"
      style={{
        backgroundColor: `rgb(${r} ${g} ${b})`,
        height: 100,
        order: `${trackNo}`,
      }}
    >
        {/* to do --> only show title on hover. and play preview clip on hover. (do post launch?) */}
      <p className="opacity-60">{track}</p>
    </div>
  );
}
