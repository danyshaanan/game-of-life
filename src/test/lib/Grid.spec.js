'use strict'

import test from 'ava'
import Grid from '../../main/lib/Grid.js'

test('Grid', t => {
  t.truthy(Grid)
  const grid = new Grid({
    document: { querySelector: () => ({ getContext: _ => ({}) }) },
    dimensions: []
  })
  t.truthy(grid.dot)
})

test.cb('Grid.dot', t => {
  const fillRect = (...args) => {
    t.deepEqual(args, [4, 5, 1, 1])
    t.end()
  }

  const mockCtx = { fillRect }
  const mockCanvas = { getContext: _ => mockCtx }

  const grid = new Grid({
    document: { querySelector: () => mockCanvas },
    dimensions: [11, 22]
  })

  grid.dot([4, 5], '#aaa')

  t.is(mockCanvas.width, 11)
  t.is(mockCanvas.height, 22)
  t.is(mockCtx.fillStyle, '#aaa')
})
