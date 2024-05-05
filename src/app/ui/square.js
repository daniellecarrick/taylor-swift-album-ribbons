export default function Square({ r, g, b, a }) {
  return (
    <div
      className="grow h-20"
      style={{
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
      }}
    >&nbsp;</div>
  );
}
