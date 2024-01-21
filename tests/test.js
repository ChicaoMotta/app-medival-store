const a = {
  b: 1,
  c: [{d: 1},{f: 2}],
}

const b = {
  z: Object.values(...a.c)
}

console.log(b);