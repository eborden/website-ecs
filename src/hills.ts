import random from 'lodash/random'
import {screen} from './screen'
import {randomPositions} from "./position"
import {randomColor} from "./color"

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
    position.state.y = screen.height
    color.state.hex = randomColor()
    ECS.addEntity(hill)
  }
}

