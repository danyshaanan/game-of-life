'use strict'

const getRule = require('./rules.js').getRule
const CellSet = require('./CellSet.js')

const neiDiffs = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]
// const neiDiffs = [0, 1, 2, 3, 5, 6, 7, 8].map(i => [(i / 3 | 0) - 1, i % 3 - 1])

const add = (p, q) => [p[0] + q[0], p[1] + q[1]]
const modulo = (p, q) => [(p[0] + q[0]) % q[0], (p[1] + q[1]) % q[1]]

module.exports = class Gol {
  constructor(options) {
    this.dimensions = options.dimensions
    this.rule = getRule(options.rule)
    this.changedSinceLastCalc = new CellSet(options.pattern)
    this.liveCells = new CellSet(options.pattern)
    this.diff = new CellSet(options.pattern)
  }
  isAlive(cell) {
    return this.liveCells.has(cell)
  }
  getColor(cell) {
    return this.isAlive(cell) ? 'black' : 'white'
  }
  toggle(cell) {
    cell = modulo(cell, this.dimensions)
    this.liveCells.toggle(cell)
    this.changedSinceLastCalc.toggle(cell)
    this.diff.toggle(cell)
  }
  tick(n = 1) {
    const neighbours = c => neiDiffs.map(d => modulo(add(c, d), this.dimensions))
    const countNeighbours = cell => neighbours(cell).filter(s => this.isAlive(s)).length
    const shouldChange = (cell, nei) => (
      (this.isAlive(cell) && !this.rule.survives.has(nei)) ||
      (!this.isAlive(cell) && this.rule.born.has(nei))
    )

    const iterate = lastGenChanged => new CellSet(
      lastGenChanged.toArray()
        .reduce((a, c) => a.concat([c, ...neighbours(c)]), [])
        .filter(cell => shouldChange(cell, countNeighbours(cell)))
    )

    for (let i = n; i > 0; i--) {
      this.changedSinceLastCalc = iterate(this.changedSinceLastCalc)
      this.changedSinceLastCalc.toArray().forEach(c => {
        this.liveCells.toggle(c)
        this.diff.toggle(c)
      })
    }

    const ret = this.diff
    this.diff = new CellSet()
    return ret
  }
}
