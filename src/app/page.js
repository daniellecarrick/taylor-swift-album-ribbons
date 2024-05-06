"use client";
import { data } from "./data/audio_features_data";
import * as d3 from "d3";
import SongStrip from "./ui/songSwatch";
import Player from "./ui/audioPlayer";
import Image from "next/image";

// ALL THE D3 STUFF

// Group the data by Album
const dataByAlbum = d3.group(data, (d) => d.album);

// Just folklore and evermore
const folklore = dataByAlbum.get('folklore (deluxe version)')
const evermore = dataByAlbum.get('evermore (deluxe version)')


//set up a scale for each color channel that accepts the song value and rescales it between 0 and 255
const rScale = d3.scaleLog(
  d3.extent(data.map((track) => track.energy)),
  [0, 255]
);
const gScale = d3.scaleLog(
  d3.extent(data.map((track) => track.danceability)),
  [0, 255]
);
const bScale = d3.scaleLog(
  d3.extent(data.map((track) => track.acousticness)),
  [0, 255]
);

const percentScale = d3.scaleLinear(
  d3.extent(data.map((track) => track.loudness)),
  [0.25, 1]
);

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-between p-8 lg:p-32">
      <div className="lg:max-w-xl">
        <h1 className="leading-snug">
          Visualizing Taylor Swift's eras as color swatches
        </h1>
        <p>By Danielle Carrick</p>
        <Image
          src="/colorStrip.png"
          width={1200}
          height={3}
          className="mb-16"
          alt={""}
        />
        <p>
          Taylor Swift famously shifts her sound with each album, creating new
          &quot;eras&quot; in her discography. From her twangy country origins
          in <i>Taylor Swift</i> to the indie-infused narratives of{" "}
          <i>folklore</i> and <i>evermore</i>, Swift has continuously reinvented
          her sound.
        </p>
        <p>
          Sonically, we recognize these distinct eras in her discography…but can
          we quantify them? Visualize them? What is it about each album that
          contributes to its unique sound?
        </p>
        <p>
          The{" "}
          <a href="https://developer.spotify.com/documentation/web-api/reference/get-track">
            Spotify API
          </a>{" "}
          provides a set of audio features for every song that we can use to
          understand trends through Taylor Swift's discography.{" "}
        </p>
        <p>In particular, I use four of Spotify's measures:</p>
        <ul className="list-disc ml-8">
          <li>Energy</li>
          <li>Danceability</li>
          <li>Acousticness </li>
          <li>Loudness</li>
        </ul>

        <p>
          To visualize a song, I convert these measures to RGBA space. RGB
          stands for Red, Green and Blue. A stands for Alpha, which controls
          opacity. Assigning a measure to each of these channels gives me a color swatch for each song. String all the
          songs in an album together into a ribbon, and this gives us an
          impression of the sonic DNA within and across albums.
        </p>
        <p>
          But what really are these measures? And how exactly do we go from four
          abstract numbers describing the song to a single color swatch?
        </p>
        <h2>Determine a color for each track</h2>
        {/* -------------------------------------
      -----------  ENERGY  ---------------
      ------------------------------------- */}
        <h3>More energetic songs appear redder</h3>
        <p>
          Energetic songs are characterized by intensity and vigor. Taylor
          Swift's most energetic song is &quot;Haunted&quot; off of{" "}
          <i>Speak Now</i>. It pulses with emotion and intensity, and presents
          in the analysis as a vividly warm red.
        </p>
        <div className="flex flex-row gap-4">
          <Player
            preview_url={
              "https://p.scdn.co/mp3-preview/199141e075dd0cb7ec9b57874f7a7b147343cb6f?cid=cfe923b2d660439caf2b557b21f31221"
            }
            album={"Speak Now (Taylor's Version)"}
            track={"Haunted (Taylor's Version)"}
            r={rScale(0.915)}
            g={gScale(0.427)}
            b={bScale(0.00667)}
            a={percentScale(-1.909)}
          />
        </div>
        {/* -------------------------------------
      -----------  DANCEABILITY ---------------
      ------------------------------------- */}
        <h3>More danceable songs appear green</h3>
        <p>
          Danceability measures musical elements like tempo, rhythm stability,
          beat strength, and overall regularity. &quot;I Think He Knows&quot;
          off of <i>Lover</i> has one of the highest danceability scores, and
          and so its corresponding color swatch is a sugary lime green.
        </p>
        <div className="flex flex-row gap-4">
          <Player
            preview_url={
              "https://p.scdn.co/mp3-preview/9a872988c1ad7fe5403c63041d887456214dbe9b?cid=cfe923b2d660439caf2b557b21f31221"
            }
            album={"Lover"}
            track={"I Think He Knows"}
            r={rScale(0.366)}
            g={gScale(0.897)}
            b={bScale(0.00889)}
            a={percentScale(-8.029)}
          />
        </div>

        {/* -------------------------------------
      -----------  ACOUSTICNESS  ---------------
      ------------------------------------- */}
        <h3>More acoustic songs appear blue</h3>
        <p>
          Songs with high acousticness will have stripped-down arrangements and
          organic instrumentation. &quot;Sweet Nothing&quot; off of{" "}
          <i>Midnights</i> is a nice example of a highly acoustic song. Look at
          its swatch here:
        </p>
        <div className="flex flex-row gap-4">
          <Player
            preview_url={
              "https://p.scdn.co/mp3-preview/5d55bc6094ad5ca89529ee2b0cbee31daa3e1a1c?cid=cfe923b2d660439caf2b557b21f31221"
            }
            album={"Midnights (The Til Dawn Edition)"}
            track={"Sweet Nothing"}
            r={rScale(0.166)}
            g={gScale(0.335)}
            b={bScale(0.967)}
            a={percentScale(-14.958)}
          />
        </div>
        <p>
          I know you might be thinking &quot;Hey, that looks pretty
          purple&quot;. And you're right! That's because while it ranks high on
          acousticness, it has a low loudness value, making it lighter. Here{" "}
          <span
            style={{
              height: 12,
              width: 12,
              backgroundColor: "rgba(31, 22, 255)",
              display: "inline-block",
            }}
          ></span>{" "}
          is what it would look like without opacity applied. Now <b>that's</b>{" "}
          blue!
        </p>

        <h3>Things to look for in the Era's Paint Swatchs</h3>
        <p>
          As you explore all of the albums below, there are a few things to pay
          attention to. First of all, you'll notice that <i>folklore</i> and{" "}
          <i>evermore</i>, considered part of the same era, are also visually
          similar. They both have color swatches composed of light purple with a
          sprinkle of blues and pinks. Those two albums represent Swift's
          journey into indie influences and showcase some of her most acoustic
          songs.
        </p>
        <p>
          In fact, her last 4 albums have been the most acoustic of her career.
          Earlier albums have higher median danceability and energy values. The
          tracks on <i>1989 (Taylor's Version)</i> and{" "}
          <i>Speak Now (Taylor's Version)</i> both have the highest median
          energy value resulting in their color ribbon's stronger red tones.{" "}
          <i>Lover</i> has the highest median danceability and therefore the
          most green tones.
        </p>
        <p>
          Of course this approach is subject to interpretation. Using different
          audio features or assigning them to other colors will produce varied
          color ribbons and highlight unique sounds. I don't think we can truly
          define a song with four metrics and a color, but even these few
          features quickly illuminate the musical quality of Swift's work.
        </p>
      </div>
      <div className="viz z-10 w-full items-center">
        <div className="flex flex-col flex-wrap grow shrink">
          <h2 className="mt-24">Album Color Ribbons</h2>
          <p>Tap to see each song title.</p>
          {Array.from(dataByAlbum, ([key, values]) => {
            return (
              <div className="flex flex-col w-full font-mono" key={key}>
                <h3 className="mt-4">{key}</h3>
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
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-xs text-slate-400">
        Note: To account for multiple releases of an album, the release with
        with greatest number of tracks is used. In addition, when available,
        only "(Taylor's Version)" releases are included. No live albums are
        included. I used a logarithmic scale to convert energy, danceability and
        acousticness audio features into a value between 0 and 255. The alpha
        value (also known as opacity) is a number between 0 and 100% and used a
        linear scale. Support and consultation provided by Stuart Mason.
      </p>
    </main>
  );
}
