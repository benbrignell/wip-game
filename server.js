const express = require("express");
const next = require("next");
const LRUCache = require("lru-cache");
const rollbar = require("rollbar");
const analytics = require("universal-analytics");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: ".", dev: dev, quiet: dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 1000,
  maxAge: dev ? 0 : 1000 * 60 * 60 * 24, // 24h
});

app.prepare().then(() => {
  const server = express();

  // TODO
  // server.use(analytics.middleware("UA-3628636-3", { https: true }));

  // Serve static assets
  const assetMaxAge = dev ? 0 : "1y";
  server.use("/static", express.static("./static", { maxAge: assetMaxAge }));

  server.get("/", (req, res) => {
    const query = req.query && Object.keys(req.query);

    renderAndCache(req, res, "/", query[0] ? { [query[0]]: true } : undefined);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  // TODO
  // Report errors to Rollbar
  // server.use(
  //   rollbar.errorHandler("e6f00fecd890473f83b225a6c01b36fc", {
  //     environment: process.env.NODE_ENV || "development",
  //   })
  // );

  server.listen(3000, err => {
    if (err) throw err;
    dev && console.log("> Starting in dev mode");
    console.log("> Ready on http://localhost:3000");
  });
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`;
}

function renderAndCache(req, res, pagePath, queryParams) {
  // TODO:
  // trackVisit(req, res, pagePath);

  // If we have a page in the cache, let's serve it
  const key = getCacheKey(req);

  if (!dev && ssrCache.has(key)) {
    res.send(ssrCache.get(key));
    return;
  }

  // If not let's render the page into HTML
  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then(html => {
      // Let's cache this page
      ssrCache.set(key, html);

      res.send(html);
    })
    .catch(err => {
      app.renderError(err, req, res, pagePath, queryParams);
    });
}

function trackVisit(req, res, pagePath) {
  try {
    var acceptLanguage = req.headers["accept-language"];

    if (acceptLanguage) {
      acceptLanguage = acceptLanguage.split(",")[0].split(";")[0].toLowerCase();
    }

    const trackingObject = {
      dp: req.originalUrl,
      dr: req.get("Referrer"),
      dl: `https://TODO.com${pagePath}`,
      dt: "TODO",
      uip: req.ip || undefined,
      ua: req.get("user-agent"),
      ul: acceptLanguage,
    };

    if (dev) {
      console.log(trackingObject);
    } else {
      req.visitor.pageview(trackingObject).send();
    }
  } catch (error) {
    throw new Error(error);
  }
}
