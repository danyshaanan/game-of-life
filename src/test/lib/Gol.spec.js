'use strict'

import test from 'ava'
import Gol from '../../main/lib/Gol.js'
import CellSet from '../../main/lib/CellSet.js'

test('Gol', t => {
  // Is a class:
  const gol = new Gol({ dimensions: [100, 100] })
  // Should expose some functions:
  t.is(typeof gol.toggle, 'function')
  t.is(typeof gol.tick, 'function')
  t.is(typeof gol.isAlive, 'function')
  t.is(typeof gol.getColor, 'function')
  // livingCells and tick should return a CellSet:
  t.truthy(gol.tick(0) instanceof CellSet)
  // Cells should be off by default:
  t.is(gol.isAlive([1, 1]), false)
  // but can be toggled on and off:
  gol.toggle([1, 1])
  t.is(gol.isAlive([1, 1]), true)
  t.is(gol.getColor([1, 1]), 'black')
  gol.toggle([1, 1])
  t.is(gol.isAlive([1, 1]), false)
  t.is(gol.getColor([1, 1]), 'white')
  // And wrap:
  gol.toggle([101, 101])
  t.is(gol.liveCells.has([1, 1]), true)
  gol.toggle([201, 201])
  t.is(gol.liveCells.has([1, 1]), false)

  // tick() should just return everything that changed since the last tick()
  t.deepEqual(gol.tick(0).toArray(), [])
  gol.toggle([1, 1])
  t.deepEqual(gol.tick(0).toArray(), [[1, 1]])
  t.deepEqual(gol.tick(0).toArray(), [])
  t.deepEqual(gol.tick(1).toArray(), [[1, 1]])

  gol.tick()
})

test('Gol - blinker', t => {
  const gol = new Gol({
    dimensions: [100, 100],
    pattern: [[1, 0], [1, 1], [1, 2]]
  })

  t.deepEqual(gol.tick(0).toArray(), [[1, 0], [1, 1], [1, 2]])
  t.deepEqual(gol.tick(1).toArray(), [[1, 0], [2, 1], [0, 1], [1, 2]])
  t.deepEqual(gol.tick(2).toArray(), [])
  t.deepEqual(gol.tick(4).toArray(), [])
})

test('Gol - glider', t => {
  const glider = [[3, 1], [3, 2], [3, 3], [2, 3], [1, 2]]
  const shiftGlider = n => glider.map(c => [c[0] + n, c[1] + n])

  const gol = new Gol({
    dimensions: [100, 100],
    pattern: glider
  })

  gol.tick(4)
  t.truthy(shiftGlider(1).every(c => gol.isAlive(c)))
  gol.tick(40)
  t.truthy(shiftGlider(11).every(c => gol.isAlive(c)))
})
