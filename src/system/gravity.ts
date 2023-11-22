import {Component, Entity, Processor} from "javascript-entity-component-system"
import min from 'lodash/min'
import {screen} from '../screen'

export const GRAVITY = 0.7
const TERMINAL_VELOCITY = screen.width / 100

export const GravityProcessor: Processor = {
  name: "gravity_processor",
  required: ["position", "mass"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [position, mass] = components

    const result = mass.state.mass * GRAVITY

    mass.state.velocityY = min([TERMINAL_VELOCITY, mass.state.velocityY + result])
    position.state.y = position.state.y + mass.state.velocityY
  }
}

