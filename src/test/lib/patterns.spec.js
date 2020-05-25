'use strict'

import test from 'ava'
import patterns from '../../main/lib/patterns.js'

test('patterns', t => {
  t.truthy(patterns)
  t.truthy(patterns.gliderGun)
})
