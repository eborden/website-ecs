import {Entity} from "javascript-entity-component-system"
import random from 'lodash/random'
import {screen} from './screen'
import {randomPositions} from "./position"
import {randomColor} from "./color"

export function init (ECS, colliders: Entity[]) {
  for (var x of randomPositions(50)) {
    const tree = ECS.createEntity(
      "Tree",
      ["position", "color"],
      ["scene_render_processor"]
    )
    const [position, color] = ECS.getEntityComponents(tree, ['position', 'color'])
    position.state.h = 100 - random(0, 50)
    position.state.w = 40 - random(0, 20)
    position.state.x = x
    position.state.y = screen.height - position.state.h
    color.state.hex = randomColor()
    ECS.addEntity(tree)
    colliders.push(tree)
  }
}
