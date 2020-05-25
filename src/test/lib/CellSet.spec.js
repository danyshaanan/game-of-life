'use strict'

import test from 'ava'
import CellSet from '../../main/lib/CellSet.js'

test('CellSet', t => {
  const cellSet1 = new CellSet()
  const cellSet2 = new CellSet([[1, 1], [2, 2]])

  t.is(cellSet1.has([1, 1]), false)
  t.is(cellSet2.has([1, 1]), true)

  t.deepEqual(cellSet1.toArray(), [])
  t.deepEqual(cellSet2.toArray(), [[1, 1], [2, 2]])

  cellSet2.delete([1, 1])
  t.is(cellSet2.has([1, 1]), false)
  cellSet2.add([1, 1])
  t.is(cellSet2.has([1, 1]), true)
  cellSet2.toggle([1, 1])
  t.is(cellSet2.has([1, 1]), false)
  cellSet2.toggle([1, 1])
  t.is(cellSet2.has([1, 1]), true)

  t.deepEqual(cellSet2.toArray(), [[2, 2], [1, 1]])
})
