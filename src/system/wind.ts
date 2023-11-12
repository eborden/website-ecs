import {Component, Entity, Processor} from "javascript-entity-component-system"

const WIND = 0.1

export const WindProcessor: Processor = {
  name: "wind_processor",
  required: ["position", "mass"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [position, mass] = components
    position.state.x -= WIND + mass.state.velocityX
    position.state.y = position.state.y + mass.state.velocityY
  }
}
