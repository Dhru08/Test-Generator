function uniquePairs(m, node) {
  const st = new Set();

  function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  while (m > 0) {
      let u = randomInt(1, node);
      let v = randomInt(1, node);
      if (u > v) [u, v] = [v, u];  // Swap u and v if u is greater than v
      if (u === v || st.has(`${u} ${v}`)) continue;
      st.add(`${u} ${v}`);
      m--;
  }

  return Array.from(st).map(pair => pair.split(' ').map(Number));
}

// Example usage:
let pairs = uniquePairs(10, 100);
console.log(pairs);
