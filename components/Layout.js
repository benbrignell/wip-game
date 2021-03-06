import React from "react";

import Head from "../components/Head.js";

import styles from "../helpers/styles.js";

export default ({ children, title }) => (
  <div id="layout">
    <style jsx global>{`
      @viewport {width: device-width;}

      /*
        Resets annoying things */

      * {
        margin: 0;
        padding: 0;
        background: none;
        border: none;
        font: inherit;
        color: inherit;
        vertical-align: baseline;
        box-sizing: border-box;
        -webkit-text-decoration-skip: ink;
                text-decoration-skip: ink;
        -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
                text-size-adjust: 100%;
      }

      ul, ol {
        padding-left: 1rem;
      }

      /*
        HTML5 element and media display */

      article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary, video, audio, canvas, img, svg {
        display: block;
      }

      /*
        Misc element fixes */

      a {
        background-color: transparent;
      }

      sub, sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
      }

      sup { top: -0.5em; }
      sub { bottom: -0.25em; }

      /*
        Buttons and forms */

      button,
      [type="submit"],
      [type="reset"] {
        -webkit-appearance: none;
          -moz-appearance: none;
                appearance: none;
        background: none;
        border: none;
        border-radius: 0;
        cursor: pointer;
        white-space: normal;
      }

      [disabled] {
        cursor: not-allowed !important;
      }

      ::-webkit-input-placeholder {
        opacity: 1;
        color: inherit;
      }

      ::-moz-placeholder {
        opacity: 1;
        color: inherit;
      }

      :-ms-input-placeholder {
        opacity: 1;
        color: inherit;
      }

      ::placeholder {
        opacity: 1;
        color: inherit;
      }

      button::-moz-focus-inner,
      input::-moz-focus-inner {
        border: 0;
        padding: 0;
      }

      input[type="search"] {
        -webkit-appearance: textfield;
      }

      input[type="search"]::-webkit-search-cancel-button,
      input[type="search"]::-webkit-search-decoration {
        -webkit-appearance: none;
      }

      textarea {
        overflow: auto;
        resize: vertical;
        display: block;
      }

      /*
        Tables */

      table {
        border-collapse: collapse;
        border-spacing: 0;
        min-width: 100%;
      }

      td, th {
        text-align: left;
      }

      /*
        Removes touch input lag from tappable things */

      a,
      button,
      input,
      textarea,
      select {
        -ms-touch-action: manipulation;
            touch-action: manipulation;
      }

      /*
        System font family */

      html {
        font-family:
          system-ui, -apple-system, BlinkMacSystemFont,
          "Segoe UI", Roboto, Helvetica, sans-serif,
          "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
        ;
        font-size: 133%; /* Fallback: used if browser doesn't support calc() */
        font-size: calc(1em + 0.5vw + 0.5vh + 0.25vmin);
        background-color: ${styles.water};
        color: ${styles.white};
      }

      body {
        line-height: 1rem;
        font-size: 0.8rem; /* = line-height of 1.25 */
      }
    `}</style>

    <Head title={title} />

    {children}
  </div>
);
