import random from 'lodash/random'
import {screen} from '../screen'
import {randomPositions} from "../component/position"
import {randomColor} from "../component/color"

export function init (ECS) {
  for (var x of randomPositions(Math.round(screen.width / 15))) {
    const leaf = ECS.createEntity(
      "Leaf",
      ["position", "color", "mass"],
      ["wind_processor", "wiggle_processor", "edge_respawn_processor", "scene_render_processor"]
    )
    const [position, color, mass] = ECS.getEntityComponents(leaf, ['position', 'color', 'mass'])
    mass.state.velocityX = random(0.1, 0.7)
    mass.state.velocityY = random(0.1, 0.2)
    position.state.h = 3
    position.state.w = 3
    position.state.x = x
    position.state.y = screen.height - (random(0, 100) + 10)
    color.state.hex = randomColor()
    ECS.addEntity(leaf)
  }
}
