'use strict'

const parseSet = (s, r) => new Set(((s.match(r) || [])[1] || '').split('').map(Number))

const getRule = (rule = 'b3s23') => ({
  born: parseSet(rule, /[bB](\d*)/),
  survives: parseSet(rule, /[sS](\d*)/)
})

module.exports = {
  getRule
}
