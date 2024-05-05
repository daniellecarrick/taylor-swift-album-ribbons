export default function Player({ preview_url, track, album, r, g, b, a }) {
  return (
    <div
      style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
      className="p-4 pt-2"
    >
      <p className="font-mono text-xs">{track}</p>
      <p className="font-mono text-xs">
        <i>{album}</i>
      </p>
      <audio src={preview_url} controls></audio>
    </div>
  );
}
