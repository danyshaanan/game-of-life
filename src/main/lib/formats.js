/* eslint no-return-assign:0, no-sequences:0,prefer-template:0 */
'use strict'

const fromRLE = st => {
  const res = []
  let [row, col] = [0, 0]
  const funcs = {
    o: n => { while (n--) res.push([row, col++]) },
    b: n => { col += n },
    $: n => { [row, col] = [row + n, 0] }
  }
  st.replace(/(\d*)([bo$])/g, (x, n, c) => funcs[c](Math.max(n, 1)))
  return res
}
const toRLE = pairs => {
  const rowReducer = (o, [a, b]) => (o[a] = (o[a] || []).concat([b]), o)
  const getRows = p => Array.from(p.reduce(rowReducer, []))
  const rowToArray = row => Array.from((row || []).reduce((a, n) => a[n] = a, []))
  const arrayToString = arr => arr.map(n => n ? 'o' : 'b').join('') + '$'

  return getRows(pairs).map(rowToArray).map(arrayToString).join('').split('').reduce((o, curr) => ({
    prev: curr,
    l: o.prev === curr ? o.l + 1 : 1,
    s: (o.prev && o.prev !== curr) ? o.s + (o.l > 1 ? o.l : '') + o.prev : o.s
  }), {s: ''}).s + '!'
}

const fromL = st => fromRLE(st.replace(/A/g, 'o').replace(/\./g, 'b'))
const toL = pairs => toRLE(pairs).replace(/o/g, 'A').replace(/b/g, '.')

const fromGrid = (live, grid) => grid
  .split('\n')
  .map((row, i) => row.split('').map((cell, j) => cell === live ? [i, j] : 0).filter(Boolean))
  .reduce((o, line) => o.concat(line), [])

module.exports = { fromRLE, toRLE, fromL, toL, fromGrid }
