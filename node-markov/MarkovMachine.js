class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    let chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (!chains[word]) {
        chains[word] = [];
      }
      chains[word].push(nextWord);
    }

    this.chains = chains;
  }

  /** return random text starting from a capitalized word */
  makeText(numWords = 100) {
    let keys = Object.keys(this.chains).filter(word => /^[A-Z]/.test(word));
    let key = this.choice(keys);
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = this.choice(this.chains[key]);
    }

    return out.join(" ");
  }

  choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

module.exports = MarkovMachine;
