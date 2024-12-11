/** Command-line tool to generate Markov text. */

const fs = require("fs");
const process = require("process");
const axios = require("axios");
const MarkovMachine = require("./MarkovMachine");

/** read file at path and print out text. */
function generateTextFromFile(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      let mm = new MarkovMachine(data);
      console.log(mm.makeText());
    }
  });
}

/** read URL and print out text. */
async function generateTextFromURL(url) {
  try {
    let resp = await axios.get(url);
    let mm = new MarkovMachine(resp.data);
    console.log(mm.makeText());
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
}

/** interpret cmdline to decide what to do. */
let [method, path] = process.argv.slice(2);

if (method === "file") {
  generateTextFromFile(path);
} else if (method === "url") {
  generateTextFromURL(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
