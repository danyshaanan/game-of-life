'use strict'

import test from 'ava'
import rules from '../../main/lib/rules.js'

let rule

test('rules', t => {
  t.truthy(rules.getRule)
  // default rule:
  rule = rules.getRule()
  t.deepEqual(Array.from(rule.born), [3])
  t.deepEqual(Array.from(rule.survives), [2, 3])
  // growth rule:
  rule = rules.getRule('b3s345')
  t.deepEqual(Array.from(rule.born), [3])
  t.deepEqual(Array.from(rule.survives), [3, 4, 5])
  // empty rule:
  rule = rules.getRule('bs')
  t.deepEqual(Array.from(rule.born), [])
  t.deepEqual(Array.from(rule.survives), [])
  // reverse rule:
  rule = rules.getRule('s345b3')
  t.deepEqual(Array.from(rule.born), [3])
  t.deepEqual(Array.from(rule.survives), [3, 4, 5])
  // only born:
  rule = rules.getRule('b3')
  t.deepEqual(Array.from(rule.born), [3])
  t.deepEqual(Array.from(rule.survives), [])
  // only survives:
  rule = rules.getRule('s345')
  t.deepEqual(Array.from(rule.born), [])
  t.deepEqual(Array.from(rule.survives), [3, 4, 5])
  // uppercase:
  rule = rules.getRule('B1357/S1357')
  t.deepEqual(Array.from(rule.born), [1, 3, 5, 7])
  t.deepEqual(Array.from(rule.survives), [1, 3, 5, 7])
})
