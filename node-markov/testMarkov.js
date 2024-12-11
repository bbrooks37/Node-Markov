// testMarkov.js
const MarkovMachine = require('./MarkovMachine');

let mm = new MarkovMachine("the cat in the hat");
console.log(mm.makeText());
console.log(mm.makeText(50));
