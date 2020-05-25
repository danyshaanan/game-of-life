'use strict'

const randRound = n => Math.trunc(n) + (Math.random() < n % 1)

module.exports = {
  randRound
}
