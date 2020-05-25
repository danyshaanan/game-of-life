'use strict'

const u = require('./patternsUtils.js')
const f = require('./formats.js')

const patterns = {
  glider: 'bo$2bo$3o!',
  missingname: '100o!',
  Rpentomino: 'b2o$2o$bo!',
  Acorn: '2o2b3o$3bo$bo!',
  lightweightSpaceship: '4o$o3bo$o$bo!',
  gliderGun: '2b2o$2b2o7$3b2o$2bobo$2b2o6$4b3o$4bo$5bo4$b2o$obo$2o10b2o$12bobo$12bo8$2o$2o5b3o$7bo$8bo!',
  B52bomber: 'b2o36b$b2o17bo18b$19bobo12bobo2b$20bo12bo5b$2o7b2o23bo2bob$2obo5b2o23bobobo$3bo23bo7bo2bo$3bo23b2o7b2ob$o2bo17b2o5bo10b$b2o18bo17b$21b3o15b$36b2ob$36b2ob$b2o36b$o2bo35b$obobo16bobo4b2o5b2o2b$bo2bo17b2o4b2o5b2obo$5bo12bo3bo15bo$2bobo12bobo18bo$18bo16bo2bo$36b2o!',
  gliderlessGun: '9b2o2bobo$2b2o4b3obo3bo$2b2o3b2o6bo$8bob5o22b2o3bo$9b3o25b3obob2o4b2o$37b3o4bo4b2o$9b3o28bo3bo$8bob5o26b3o$2b2o3b2o6bo$2b2o4b3obo3bo24b3o$9b2o2bobo24bo3bo$21bo15b3o4bo4b2o$19b2o16b3obob2o4b2o$20b2o15b2o3bo3$2b2o19bo2bo$2b2o23bo19b4o$23bo3bo18bo3bo$24b4o22bo$46bo2bo$2b3o3b3o$bo2bo3bo2bo$5bobo$b2o7b2o$b2o7b2o$4bo3bo$4b2ob2o$2b3o3b3o$2b2o5b2o$2bo7bo13$2b2o5b2o$2b2o5b2o!',
  SHIP: '4b2o$3b4o2$2b6o$3b4o2$2b2o2b2o$2obo2bob2o$3bo2bo3$4b2o$4b2o!',
  gbt12: '3o$2bo2$o$3o!'
}

// patterns['?'] = u.fromRLE(``)

Object.keys(patterns).forEach(k => { patterns[k] = u.centerIn(f.fromRLE(patterns[k]), [500, 500]) })

module.exports = patterns
