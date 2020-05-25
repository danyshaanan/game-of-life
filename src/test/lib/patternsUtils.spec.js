'use strict'

import test from 'ava'
import patternsUtils from '../../main/lib/patternsUtils.js'

const { add, sub, transpose, min, max, size, join, center, centerIn, zero } = patternsUtils

const patterns = require('../../main/lib/patterns.js')

const check = (pattern, dot1, dot2) => {
  test('patternsUtils', t => {
    // t.deepEqual(add(pattern, dot1), pattern.map(p => [0, 1].map(i => p[i] + dot1[i])))
    // t.deepEqual(sub(pattern, dot1), pattern.map(p => [0, 1].map(i => p[i] - dot1[i])))
    // t.deepEqual(transpose(pattern), pattern.map(([x, y]) => [y, x]))
    // t.deepEqual(min(pattern), [0, 1].map(i => Math.min(...pattern.map(c => c[i]))))
    // t.deepEqual(max(pattern), [0, 1].map(i => Math.max(...pattern.map(c => c[i]))))
    // t.deepEqual(size(pattern), ((n, x) => [0, 1].map(i => x[i] - n[i] + 1))(min(pattern), max(pattern)))
    // t.deepEqual(join(pattern, [dot1]), Array.from(new Set([...pattern, ...[dot1]])))
    // t.deepEqual(center(pattern), ((n, x) => [0, 1].map(i => Math.round((x[i] + n[i] - 1) / 2)))(min(pattern), max(pattern)))
    // t.deepEqual(centerIn(pattern, dot1), add(pattern, sub([center([[0, 0], dot1])], center(pattern))[0]))

    t.deepEqual(add([[2, 2]], [3, 3]), [[5, 5]])
    t.deepEqual(sub([[2, 2]], [3, 3]), [[-1, -1]])
    t.deepEqual(transpose([[44, 1]]), [[1, 44]])
    t.deepEqual(center([[100, 49], [50, -50]]), [75, -1])
    t.deepEqual(size([[100, 49], [50, -50]]), [51, 100])
    t.deepEqual(join([[1, 1]], [[2, 2]]), [[1, 1], [2, 2]])
    t.deepEqual(centerIn([[10, 10]], [30, 30]), [[15, 15]])
    t.deepEqual(zero([[3, 3]]), [[0, 0]])
    t.deepEqual(zero([[-3, -3]]), [[0, 0]])

    t.deepEqual(pattern, transpose(transpose(pattern)))
    t.deepEqual(size(pattern), add(sub([max(pattern)], min(pattern)), [1, 1])[0])
    t.deepEqual(add(add(pattern, dot1), dot2), add(add(pattern, dot2), dot1))
    t.deepEqual(add(add(pattern, dot1), dot2), add(pattern, add([dot2], dot1)[0]))
    t.deepEqual([center(add(pattern, dot1))], add([center(pattern)], dot1))
    t.deepEqual(join(pattern, pattern), pattern)
    t.deepEqual(min(sub(pattern, min(pattern))), min(centerIn(pattern, sub([max(pattern)], min(pattern))[0])))
    t.deepEqual(centerIn(pattern, dot2), centerIn(centerIn(pattern, dot1), dot2))
    t.deepEqual(zero(pattern), sub(pattern, min(pattern)))
  })
}

// let time
// test.before(t => { time = Date.now() })
// test.after(t => { console.log(Date.now() - time) })

;[[0, 0], [-88, -99], [2, 0], [2, 4]].forEach(dot1 =>
  [[-0, -0], [-53, 1350], [62, -116]].forEach(dot2 =>
    [patterns.glider, patterns.gliderGun].forEach(pattern =>
      check(pattern, dot1, dot2))))

//
