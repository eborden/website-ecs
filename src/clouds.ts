import random from 'lodash/random'
import {screen} from './screen'
import {randomPositions} from "./position"

export function init(ECS) {
  for (var x of randomPositions(Math.round(screen.width / 90))) {
    const cloud = ECS.createEntity(
      "Cloud",
      ["position", "color", "mass"],
      ["wind_processor", "edge_respawn_processor", "scene_render_processor"]
    )
    const [position, color] = ECS.getEntityComponents(cloud, ['position', 'color'])
    position.state.h = 30 - random(0, 20)
    position.state.w = 200 - random(0, 50)
    position.state.x = x
    position.state.y = (screen.height/3) - random(0, screen.height/4)
    color.state.hex = '#FFFFFF'
    ECS.addEntity(cloud)
  }
}
