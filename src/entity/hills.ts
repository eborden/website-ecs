import random from 'lodash/random'
import {screen} from '../screen'
import {randomPositions} from "../component/position"
import {randomColor} from "../component/color"

export function init(ECS) {
  for (var x of randomPositions(Math.round(screen.width / 85))) {
    const hill = ECS.createEntity(
      "Hill",
      ["position", "color"],
      ["scene_render_processor"]
    )
    const [position, color] = ECS.getEntityComponents(hill, ['position', 'color'])
    position.state.h = 100 - random(0, 50)
    position.state.w = 400 - random(0, 20)
    position.state.x = x
    position.state.y = screen.height - position.state.h
    color.state.hex = colorLuminance(randomColor(), -0.05)
    ECS.addEntity(hill)
  }
}

function colorLuminance(hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;
  // convert to decimal and change luminosity
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }
  return rgb;
}
