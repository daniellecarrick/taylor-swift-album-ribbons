export default function SpotifyPlayer({id}) {
  return (
      <div style={{height:80}}>
        <iframe src={`https://open.spotify.com/embed/track/${id}`}> you</iframe>
      </div>

  );
}
