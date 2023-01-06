// build.js
const { createWriteStream } = require("fs");
const ssr = require("done-ssr");
const dom = require("can-zone-jsdom");
const { ensureDirSync, emptyDirSync } = require("fs-extra");

const render = ssr(
    {},
    {
        domZone: (request) => {
            console.log("build.js - dom-zone");
            return dom(request, {
                root: __dirname + "/build",
                html: "index.html",
            });
        },
    },
);

// Create dist directory
ensureDirSync('dist');
// Clear it
emptyDirSync('dist');

// source: https://nodejs.org/en/knowledge/advanced/streams/how-to-use-fs-create-write-stream/
// const home = createWriteStream("dist/home.html");

// render({
//     // Some mock url that doesn't matter
//     url: "http://127.0.0.1:5501/index.html",
// }).pipe(home);

const task = createWriteStream("dist/task.html");

// http://127.0.0.1:5501/index.html#!tasks
render({
    // Some mock url that doesn't matter
    url: "http://127.0.0.1:5501/index.html#!tasks",
}).pipe(task);

// const unknown = createWriteStream("dist/unknown.html");

// render({
//     // Some mock url that doesn't matter
//     url: "http://127.0.0.1:5501/index.html#!unknown-page",
// }).pipe(unknown);