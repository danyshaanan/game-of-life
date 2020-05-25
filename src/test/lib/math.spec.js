'use strict'

import test from 'ava'
import math from '../../main/lib/math.js'

let _random

test.before(t => {
  _random = Math.random
})

test('math.randRound', t => {
  Math.random = _ => 0.2
  t.is(math.randRound(2.1), 2)
  t.is(math.randRound(2.3), 3)
  t.is(math.randRound(2.4), 3)
  Math.random = _ => 0.7
  t.is(math.randRound(2.6), 2)
  t.is(math.randRound(2.5), 2)
  t.is(math.randRound(2.8), 3)
})

test.after(t => {
  Math.random = _random
})
