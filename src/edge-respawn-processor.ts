import {Component, Entity, Processor} from "javascript-entity-component-system"
import {camera} from './camera'

export const EdgeRespawnProcessor: Processor = {
  name: "edge_respawn_processor",
  required: ["position"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [position] = components
    const {x, w} = position.state
    if ((x + w) < 0) {
      position.state.x = camera.maxX - 1
    } else if (camera.maxX < (x - w)) {
      position.state.x = 1 - w
    }
  }
}
