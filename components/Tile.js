import React, { PureComponent } from "react";

import hex from "../helpers/hex.js";
import tiles from "../helpers/tiles.js";
import styles from "../helpers/styles.js";

export default class Tile extends PureComponent {
  constructor(props) {
    super(props);

    this.seed = (props.x || 1) * (props.y || 2);
    this.state = { targeted: false, tile: this.getRandomTile() };
  }

  target = () => {
    this.setState({ targeted: true });
  };

  untarget = () => {
    this.setState({ targeted: false });
  };

  randomizeTile = () => {
    this.setState({ tile: this.getRandomTile() });
  };

  getRandomTile = () => {
    const tileKeys = Object.keys(tiles);
    return tileKeys[Math.floor(Math.random() * tileKeys.length)];
  };

  randomizer = (number = 1) => {
    var rand = Math.sin(this.seed++) * 10000;
    return (rand - Math.floor(rand)) * number;
  };

  render() {
    const { x, y, zIndex, top, left } = {
      ...this.props,
    };
    const { targeted, tile } = { ...this.state };

    const outlineOffset = hex.size;
    const color = tiles[tile];

    return (
      <div
        className="tile"
        style={{
          height: hex.height + hex.unit,
          width: hex.width + hex.unit,
          left: left + hex.unit,
          top: top + hex.unit,
        }}
      >
        <style jsx global>{`
          .tile {
            position: absolute;
          }

          .tileOutlines {
            position: absolute;
            left: 0; top: 0;
            width: 100%;
            height: 100%;
          }

          .tileOutline {
            position: absolute;
            left: 0; top: 0;
            width: 100%;
            height: 100%;
          }

          .tileTarget {
            top: ${hex.height * 0.125}${hex.unit};
            height: ${hex.height * 0.75}${hex.unit};
            width: 100%;
            position: relative;
            pointer-events: all;
            cursor: pointer;
            opacity: 0;
            outline: none;
            {/*outline: 1px solid;*/}
          }

          .tileTarget:hover,
          .tileTarget:focus {
            opacity: 1;
          }

          .tileCoordinates {
            text-align: center;
            display: block;
            font-size: ${hex.height * 0.2}${hex.unit};
            line-height: ${hex.height * 0.75}${hex.unit};
          }
        `}</style>

        {/*{targeted &&*/}
        <div className="tileOutlines">
          <svg
            className="tileOutline"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox={`0 0 ${hex.width} ${hex.height}`}
          >
            <polygon
              stroke={targeted && "currentcolor"}
              fill={color}
              strokeWidth={hex.width / 100}
              //points={`
              //  ${hex.width / 2},                                   ${-this.randomizer(outlineOffset) + 0}
              //  ${+this.randomizer(outlineOffset) + hex.width},     ${-this.randomizer(outlineOffset) + hex.height / 4}
              //  ${+this.randomizer(outlineOffset) + hex.width},     ${+this.randomizer(outlineOffset) + hex.height * 0.75}
              //  ${hex.width / 2},                                   ${+this.randomizer(outlineOffset) + hex.height}
              //  ${-this.randomizer(outlineOffset) + 0},             ${+this.randomizer(outlineOffset) + hex.height * 0.75}
              //  ${-this.randomizer(outlineOffset) + 0},             ${-this.randomizer(outlineOffset) + hex.height / 4}
              //`}
              points={`
                ${hex.width / 2}, ${0}
                ${hex.width},     ${hex.height / 4}
                ${hex.width},     ${hex.height * 0.75}
                ${hex.width / 2}, ${hex.height}
                ${0},             ${hex.height * 0.75}
                ${0},             ${hex.height / 4}
              `}
            />
          </svg>
        </div>{/*}*/}

        <button
          className="tileTarget"
          style={{ zIndex: zIndex }}
          onMouseEnter={this.target}
          onMouseLeave={this.untarget}
          onClick={this.randomizeTile}
          // TODO: handle tapping vs. colliding with scroll
          // onTouchStart={this.handleTouchStart}
          // onTouchEnd={this.handleTouchEnd}
          // onTouchCancel={this.handleTouchCancel}
          // onTouchMove={this.handleTouchMove}
        >
          <code className="tileCoordinates">{x},{y}</code>
        </button>
      </div>
    );
  }
}
