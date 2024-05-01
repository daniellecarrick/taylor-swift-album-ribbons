import Square from "./ui/square";
import { data } from "./data/data";
import * as d3 from "d3";

// ALL THE D3 STUFF

  // Group the data by Album an (TO DO order by track)
  const dataByAlbum = d3.group(data, d => d.album);

  // const percentScale = d3.scaleLinear(
  //   d3.extent(data.map((track) => track.Comp1)),
  //   [0, 100]
  // );

  // set up an RGB scale that accepts the Comp value and rescales it between 0 and 255
  const rgbScale = d3.scaleLinear(
    d3.extent(data.map((track) => track.Comp1)),
    [0, 255]
  );
  rgbScale.clamp(true);

  // playing with a unique scale just for R space
  const rScale = d3.scaleLinear([-50, 50], [0, 255]);
  rScale.clamp(true);
  // set up scale for H value 0 - 360 for Comp2
  // note: should the range be set from all of the metrics?

  const hScale = d3.scaleLinear([-50, 0], [0, 360]);
  hScale.clamp(true);

export default function Home() {
  return (
    <main className=" min-h-screen flex-col items-center justify-between p-24">
      <h1>Taylor Swift's musical ~~ vibes ~~ according to data</h1>
      <p className="my-8">
        Timbre is the quality of a musical note or sound that distinguishes
        different types of musical instruments, or voices. It is a complex
        notion also referred to as sound color, texture, or tone quality, and is
        derived from the shape of a segment’s spectro-temporal surface,
        independently of pitch and loudness. We converted those features into a
        color to see if "Red" really is, well, Red. (Spoiler: It's more of a
        Peach)
      </p>
      <div className="z-10 w-full items-center font-mono text-sm ">
        <div className="gap-4 grid lg:grid-cols-6 sm:grid-cols-4 auto-rows-[minmax(0,_2fr)]">
          {Array.from(dataByAlbum, ([key, values]) => {
            return (
              <div className="album-container grid gap-0 content-start">
                <h2 className="min-h-16">{key}</h2>
                {values.map((track) => {
                  return (
                    <Square
                      key={track}
                      r={rScale(track.Comp1)}
                      g={rgbScale(track.Comp2)}
                      b={rgbScale(track.Comp3)}
                      track={track.name}
                      trackNo={track.track_number}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
