'use strict'

const getRule = require('./lib/rules.js').getRule
const math = require('./lib/math.js')
const Grid = require('./lib/Grid.js')
const Gol = require('./lib/Gol.js')
const patterns = require('./lib/patterns.js')

const dimensions = [500, 500]

const init = pattern => [
  new Grid({ document, selector: 'canvas', dimensions }),
  new Gol({ dimensions, pattern })
]

let [ grid, gameOfLife ] = init(patterns.gliderGun)

const updateCell = c => grid.dot(c, gameOfLife.getColor(c))
const draw = changedCells => { changedCells.toArray().forEach(updateCell) }
const state = { tps: 60 }

const frame = () => {
  if (!state.freeze) draw(gameOfLife.tick(math.randRound(state.tps / 60)))
  window.requestAnimationFrame(frame)
}

document.querySelector('canvas').onclick = () => { state.freeze ^= 1 }

;(() => {
  const element = document.querySelector('input[type=range]')
  const output = document.querySelector('output')
  element.value = state.tps
  element.onchange = e => { output.value = state.tps = e.target.value }

  const createOnClickHandler = key => () => {
    [grid, gameOfLife] = init(patterns[key])
    draw(gameOfLife.tick(0))
  }
  const atts = key => ({ innerHTML: key, onclick: createOnClickHandler(key) })
  const createButton = key => Object.assign(document.createElement('button'), atts(key))
  const buttons = document.createElement('div')
  Object.keys(patterns).map(createButton).forEach(b => buttons.appendChild(b))
  document.querySelector('body').appendChild(buttons)

  document.querySelector('body').appendChild(Object.assign(
    document.createElement('input'),
    { value: 'b3s23', oninput: e => { gameOfLife.rule = getRule(e.target.value) } }
  ))
})()

draw(gameOfLife.tick(0))
frame()
