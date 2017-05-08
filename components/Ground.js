import React from "react";

import hex from "../helpers/hex.js";
import maths from "../helpers/maths.js";
import styles from "../helpers/styles.js";

import SVG from "../components/SVG.js";
import Entity from "../components/Entity.js";

const hexCoordinates = [
  [hex.width / 3, hex.height / 13],
  [hex.width / 2, 0],
  [hex.width / 3 * 2, hex.height / 13],

  [hex.width / 9 * 7, hex.height / 13 * 2],
  [hex.width, hex.height / 4],
  [hex.width, hex.height / 8 * 3],

  [hex.width, hex.height / 8 * 5],
  [hex.width, hex.height * 0.75],
  [hex.width / 8 * 7, hex.height / 5 * 4],

  [hex.width / 8 * 5, hex.height / 13 * 12],
  [hex.width / 2, hex.height],
  [hex.width / 8 * 3, hex.height / 13 * 12],

  [hex.width / 9 * 2, hex.height / 6 * 5],
  [0, hex.height * 0.75],
  [0, hex.height / 8 * 5],

  [0, hex.height / 8 * 3],
  [0, hex.height / 4],
  [hex.width / 9 * 2, hex.height / 13 * 2],
];

const randomRange = hex.size / 10;
const roundingWidth = hex.size / 9;
const waterLineWidth = hex.size / 58.6;
const waveLength = hex.size / 5;
const waveGap = hex.size / 8;

const outerWaterLineOffset = roundingWidth * 1.236;
const outerWaveLength = waveLength / 1.618;
const outerWaveGap = waveGap;

export default ({ x, y, zIndex }) => {
  let seed = (x || 1) * (y || 2);

  const hexPoints = hexCoordinates.map(point => {
    return [
      point[0] +
        hex.horizontalPadding +
        maths.random(randomRange, seed++) * (point[0] < hex.width / 2 ? -1 : 1),
      point[1] +
        hex.verticalPadding +
        maths.random(randomRange, seed++) *
          (point[1] < hex.height / 2 ? -0.5 : 0.5),
    ];
  });

  const waterLinePoints = hexPoints.reduce((result, point) => {
    return `${result} ${point[0]},${point[1]}`;
  }, "");

  const outerWaterLinePoints = hexPoints.reduce((result, point) => {
    const xPoint =
      point[0] +
      outerWaterLineOffset *
        (point[0] < hex.horizontalPadding + hex.width / 2 ? -1 : 1);
    const yPoint =
      point[1] +
      outerWaterLineOffset *
        (point[1] < hex.verticalPadding + hex.height / 2 ? -1 : 1);
    return `${result} ${xPoint},${yPoint}`;
  }, "");

  const groundPoints = hexPoints.reduce((result, point) => {
    return `${result} ${point[0]},${point[1]}`;
  }, "");

  return (
    <div className="ground">
      <style jsx global>{`
        .waterLine {
          {/*backface-visibility: hidden;
          animation: waterLine 6s linear infinite alternate;*/}
        }

        {/*@keyframes waterLine {
          0%, 62% { transform: scale(0.944); }
          100%    { transform: scale(1); }
        }*/}
      `}</style>

      <SVG
        className="waterLine"
        style={{
          zIndex: zIndex - 20,
        }}
      >
        <polygon
          stroke={styles.white}
          strokeWidth={waterLineWidth + roundingWidth}
          transform={`translate(0, ${waterLineWidth})`}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${waveLength + maths.random(waveLength, seed++)}, ${waveGap + maths.random(waveGap, seed++)}, ${waveLength + maths.random(waveLength, seed++)}, ${waveGap + maths.random(waveGap, seed++)}, ${waveLength + maths.random(waveLength, seed++)}, ${waveGap + maths.random(waveGap, seed++)}, ${waveLength + maths.random(waveLength, seed++)}, ${waveGap + maths.random(waveGap, seed++)}`}
          strokeDashoffset={seed % 100}
          fill="none"
          points={waterLinePoints}
        />
      </SVG>

      <SVG
        className="outerWaterLine"
        style={{
          zIndex: zIndex - 20,
        }}
      >
        <polygon
          stroke={styles.wave}
          strokeWidth={waterLineWidth}
          transform={`translate(0, ${waterLineWidth})`}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${outerWaveLength + maths.random(outerWaveLength, seed++)}, ${outerWaveGap + maths.random(outerWaveGap, seed++)}, ${outerWaveLength + maths.random(outerWaveLength, seed++)}, ${outerWaveGap + maths.random(outerWaveGap, seed++)}, ${outerWaveLength + maths.random(outerWaveLength, seed++)}, ${outerWaveGap + maths.random(outerWaveGap, seed++)}, ${outerWaveLength + maths.random(outerWaveLength, seed++)}, ${outerWaveGap + maths.random(waveGap, seed++)}`}
          strokeDashoffset={seed % 100}
          fill="none"
          points={outerWaterLinePoints}
        />
      </SVG>

      <SVG style={{ zIndex: zIndex - 10 }}>
        <polygon
          stroke={styles.black}
          strokeWidth={roundingWidth}
          strokeLinejoin="round"
          fill={styles.black}
          points={groundPoints}
        />

        <Entity
          x={hex.horizontalPadding + hex.width / 2}
          y={hex.verticalPadding + hex.height / 2}
          type="human"
        />
      </SVG>
    </div>
  );
};
