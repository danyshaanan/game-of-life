'use strict'

import test from 'ava'
import formats from '../../main/lib/formats.js'

const { fromRLE, toRLE, fromL, toL, fromGrid } = formats

const examples = [
  {
    L: '2A$2A3$3.2A$3.2A2$2A$2A10$.3A$.A$3A4$11.2A$11.2A2$8.2A$8.2A3$11.2A$11.2A!',
    RLE: '2o$2o3$3b2o$3b2o2$2o$2o10$b3o$bo$3o4$11b2o$11b2o2$8b2o$8b2o3$11b2o$11b2o!',
    pairs: [[0, 1], [0, 0], [1, 0], [1, 1], [4, 3], [4, 4], [5, 3], [5, 4], [7, 0], [7, 1], [8, 0], [8, 1], [18, 1], [18, 2], [18, 3], [19, 1], [20, 0], [20, 1], [20, 2], [24, 11], [24, 12], [25, 11], [25, 12], [27, 8], [27, 9], [28, 8], [28, 9], [31, 11], [31, 12], [32, 11], [32, 12]]
  },
  {
    L: '.2A$A2.A$.A.A$2.A4$5.2A$6.2A$6.A!',
    RLE: 'b2o$o2bo$bobo$2bo4$5b2o$6b2o$6bo!',
    pairs: [[0, 1], [0, 2], [1, 0], [1, 3], [2, 1], [2, 3], [3, 2], [7, 5], [7, 6], [8, 6], [8, 7], [9, 6]]
  },
  {
    L: '10.A$10.3A$13.A$12.2A5$13.2A$13.2A5$2A$.A$.A.A$2.2A7$2.A$2.A.A$2.3A$4.A!',
    RLE: '10bo$10b3o$13bo$12b2o5$13b2o$13b2o5$2o$bo$bobo$2b2o7$2bo$2bobo$2b3o$4bo!',
    pairs: [[0, 10], [1, 10], [1, 11], [1, 12], [2, 13], [3, 12], [3, 13], [8, 13], [8, 14], [9, 13], [9, 14], [14, 0], [14, 1], [15, 1], [16, 1], [16, 3], [17, 2], [17, 3], [24, 2], [25, 2], [25, 4], [26, 2], [26, 3], [26, 4], [27, 4]]
  },
  {
    L: 'A33$22.A67$22.A21.A!',
    RLE: 'o33$22bo67$22bo21bo!',
    pairs: [[33, 22], [100, 22], [0, 0], [100, 44]]
  }
]

const sort = shape => shape.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])

examples.forEach(({L, RLE, pairs}) => {
  test('RLE', t => {
    t.deepEqual(sort(fromRLE(RLE)), sort(pairs))
    t.is(toRLE(pairs), RLE)
    t.is(RLE, toRLE(fromRLE(RLE)))
    t.deepEqual(sort(pairs), sort(fromRLE(toRLE(pairs))))
  })
  test('L', t => {
    t.deepEqual(sort(fromL(L)), sort(pairs))
    t.is(toL(pairs), L)
    t.is(L, toL(fromL(L)))
    t.deepEqual(sort(pairs), sort(fromL(toL(pairs))))
  })
})

test('fromGrid', t => {
  t.deepEqual(toRLE(fromGrid('x', '.x.\nxxx\n..x')), 'bo$3o$2bo!')
})
