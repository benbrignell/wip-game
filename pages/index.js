import React, { Component } from "react";
import {
  Grid,
  AutoSizer,
  accessibilityOverscanIndicesGetter,
} from "react-virtualized";

import Layout from "../components/Layout.js";
import Cell from "../components/Cell.js";

import styles from "../helpers/styles.js";
import hex from "../helpers/hex.js";

const env = (process && process.env && process.env.NODE_ENV) || "development";
const dev = env === "development";

const cellsPerRow = 200;
const cellsPerColumn = 150;

const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
  return (
    <Cell
      key={key}
      style={style}
      cellCoordinates={[columnIndex - rowIndex * 0.5, rowIndex]}
    />
  );
};

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static async getInitialProps({ req }) {
    return {};
  }

  render() {
    return (
      <Layout>
        <div className="home">
          <style jsx global>{`
            .home {
              height: 100vh;
            }
          `}</style>

          <AutoSizer>
            {({ height, width }) => (
              <Grid
                cellRenderer={cellRenderer}
                columnWidth={hex.hexesPerRow * hex.width}
                rowHeight={hex.hexesPerColumn * hex.height * 0.75}
                height={height}
                width={width}
                className="scroller"
                rowCount={cellsPerColumn}
                columnCount={cellsPerRow}
                scrollToColumn={cellsPerRow / 2}
                scrollToRow={cellsPerColumn / 2}
                //scrollLeft={}
                //scrollTop={}
                scrollToAlignment="center"
                overscanRowCount={0}
                overscanColumnCount={0}
                overscanIndicesGetter={accessibilityOverscanIndicesGetter}
              />
            )}
          </AutoSizer>
        </div>
      </Layout>
    );
  }
}
