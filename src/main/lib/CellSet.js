'use strict'

const encode = c => `${c[0]},${c[1]}`
const decode = s => s.split(',').map(Number)

module.exports = class CellSet {
  constructor(initValues = []) {
    this.set = new Set(initValues.map(encode))
  }
  add(cell) {
    this.set.add(encode(cell))
  }
  has(cell) {
    return this.set.has(encode(cell))
  }
  delete(cell) {
    this.set.delete(encode(cell))
  }
  toggle(cell) {
    this[this.has(cell) ? 'delete' : 'add'](cell)
  }
  toArray() {
    return Array.from(this.set).map(decode)
  }
}
