'use strict'

module.exports = class Grid {
  constructor(config) {
    const canvas = config.document.querySelector(config.selector)
    ;[canvas.width, canvas.height] = config.dimensions
    this.ctx = canvas.getContext('2d')
    this.ctx.imageSmoothingEnabled = false
  }
  dot(pixel, color) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(...pixel, 1, 1)
  }
}
