import {Component, Entity, Processor} from "javascript-entity-component-system"

const DRAG = 0.07

export const DragProcessor: Processor = {
  name: "drag_processor",
  required: ["mass"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [mass] = components
    const velocity = mass.state.velocityX
    const drag = DRAG * velocity
    mass.state.velocityX = velocity - drag
  }
}


