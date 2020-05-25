'use strict'

const add = (pattern, shift) => pattern.map(c => [c[0] + shift[0], c[1] + shift[1]])
const sub = (pattern, shift) => add(pattern, shift.map(x => -x))
const min = pattern => [0, 1].map(i => Math.min(...pattern.map(c => c[i])))
const max = pattern => [0, 1].map(i => Math.max(...pattern.map(c => c[i])))
const transpose = pattern => pattern.map(([x, y]) => [y, x])
const size = pattern => ((n, x) => [0, 1].map(i => Math.abs(n[i] - x[i]) + 1))(min(pattern), max(pattern))
const join = (s1, s2) => Array.from(new Set([...s1, ...s2]))
const center = pattern => ((n, x) => [0, 1].map(i => Math.round((x[i] + n[i] - 1) / 2)))(min(pattern), max(pattern))
const centerIn = (pattern, size) => add(pattern, sub([center([[0, 0], size])], center(pattern))[0])
const zero = pattern => sub(pattern, min(pattern))

module.exports = { add, sub, transpose, min, max, size, join, center, centerIn, zero }
