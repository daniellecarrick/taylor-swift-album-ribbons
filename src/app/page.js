"use client";
import Square from "./ui/square";
import { data } from "./data/audio_features_data";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import SpotifyPlayer from "./ui/spotifyPlayer";
import SongStrip from "./ui/songStrip";

// ALL THE D3 STUFF

// Group the data by Album an (TO DO order by track)
const dataByAlbum = d3.group(data, (d) => d.album);

//set up an RGB scale that accepts the Comp value and rescales it between 0 and 255
const rgbScale = d3.scaleLinear(d3.extent([0, 1]), [0, 255]);

const rScale = d3.scaleLog(
  d3.extent(data.map((track) => track.energy)),
  [0, 255]
);
const gScale = d3.scaleLog(
  d3.extent(data.map((track) => track.danceability)),
  [0, 180]
);
const bScale = d3.scaleLog(
  d3.extent(data.map((track) => track.acousticness)),
  [0, 255]
);

const percentScale = d3.scaleLinear(
  d3.extent(data.map((track) => track.loudness)),
  [0.25, 1]
);

rgbScale.clamp();

export default function Home() {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAccessToken(data.access_token);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen flex-col items-center justify-between p-8 lg:p-8">
      <h1>Taylor Swift's musical ~~ vibes ~~ according to data</h1>
      <p className="my-8">
        We know what music sounds like and what it feels like, but what does it
        look like? Can we capture the feeling of song in say, a color? Can we
        quanitfy music?
      </p>
      <p className="my-8">
        The Spotify API quantifies each song's acousticness, energy,
        danceability and loudness among others. By assigning each of these
        values to a channel in the RGBA color space, we can create a unique
        color for each song. For example, the more energy a song has the redder
        it is. Likewise, the greater the danceability value, the more green it
        has and the more acousticness, the more blue. FInally, we adjust the
        opacity of each color square based on how loud the song is so softer
        songs show up lighter.
      </p>

      {/* -------------------------------------
      -----------  DANCEABILITY ---------------
      ------------------------------------- */}

      <h3>Let's look at some examples</h3>
      <p className="my-8">
        Let's see how that looks for a few songs. The song with the highest
        danceability score is "I think He Knows" off of <i>Lover</i>. Because
        this song has one of the highest danceability scores, it has a lot of
        green in it. It also ranks lower on energy and acousticness so green
        remains the dominant color.
      </p>
      <div className="flex flex-row gap-4">
        <SpotifyPlayer id={"2YWtcWi3a83pdEg3Gif4Pd"} />
        <Square
          r={rScale(0.366)}
          g={gScale(0.897)}
          b={bScale(0.00889)}
          a={percentScale(-8.029)}
        />
      </div>
      {/* -------------------------------------
      -----------  ENERGY  ---------------
      ------------------------------------- */}

      <h3>Energy - Haunted</h3>
      <p className="my-8">
        The most energetic song is Haunted from Speak Now. Spotify describes
        songs that rank haigh for energy as "energetic tracks feel fast, loud,
        and noisy".
      </p>
      <div className="flex flex-row gap-4">
        <SpotifyPlayer id={"4tMzIAFTFdqGBQLdfbPces"} />
        <Square
          r={rScale(0.915)}
          g={gScale(0.427)}
          b={bScale(0.00667)}
          a={percentScale(-1.909)}
        />
      </div>
      {/* -------------------------------------
      -----------  ACOUSTICNESS  ---------------
      ------------------------------------- */}
      <h3>Acousticness - Sweet Nothing</h3>
      <p className="my-8">
        "Sweet Nothing" has the highest acousticness ranking. Acousticness
        represents the use of instruments as opposed to electronic sounds. as
        opposed to electronic.
      </p>
      <div className="flex flex-row gap-4">
        <SpotifyPlayer id={"2L09RYwH5Pjzca6PmbUAw3"} />
        <Square
          r={rScale(0.166)}
          g={gScale(0.335)}
          b={bScale(0.967)}
          a={percentScale(-14.958)}
        />
      </div>
      <p className="my-8">
        I know you might be thinking "hey, that looks pretty purple". And youre
        right! THat's becuase it ranks high on acousticness (making it blue) but
        low on loudness. Because it's a softer song, it's opacity is set at .28.
        Here is what it would look like by its self.{" "}
        <span
          style={{
            height: 12,
            width: 12,
            backgroundColor: "rgba(31, 22, 255)",
            display: "inline-block",
          }}
        ></span>{" "}
        Now THAT's blue!
      </p>
      {/* -------------------------------------
      -----------  Tie  ---------------
      ------------------------------------- */}
      <h3>What happens when the scores are similar</h3>
      <p className="my-8">
        If the scores are similar in a similar range then no color will stand out and the result will
        be a shade of grey. "Now That We Don't Talk" is an example. TO DO swap with gorgeous .
      </p>
      <div className="flex flex-row gap-4">
        <SpotifyPlayer id={"5QUIK7ZtziW8kGWo8RqopF"} />
        <Square
          r={rScale(0.5)}
          g={gScale(0.8)}
          b={bScale(0.16)}
          a={percentScale(-9.332)}
        />
      </div>

      <div className="z-10 w-full items-center font-mono text-sm ">
        <div className="flex flex-row flex-wrap grow shrink">
          {Array.from(dataByAlbum, ([key, values]) => {
            return (
              <div className="flex flex-col w-full" key={key}>
                <h2 className="mt-4">{key}</h2>
                <div className="album-container flex justify-between">
                  {values.map((track, i) => {
                    return (
                      <SongStrip
                        key={track.id}
                        r={rScale(track.energy)}
                        g={gScale(track.danceability)}
                        b={bScale(track.acousticness)}
                        a={percentScale(track.loudness)}
                        track={track.name}
                        trackNo={track.track_number}
                        id={track.id}
                        token={accessToken}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p>
        Note: To account for multiple releases of an album, the release with
        with greatest number of tracks is used. In addition, when available,
        only "(Taylor's Version)" releases are included. No live albums are
        included.
      </p>d
    </main>
  );
}
