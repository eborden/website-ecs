import {Component, Entity, Processor} from "javascript-entity-component-system"
import min from 'lodash/min'
import max from 'lodash/max'
import {screen} from './screen'

export const GRAVITY = 0.7
const TERMINAL_VELOCITY = screen.width / 100

export const GravityProcessor: Processor = {
  name: "gravity_processor",
  required: ["position", "mass"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [position, mass] = components

    const result = mass.state.mass * GRAVITY

    if ((position.state.y + 1) >= (screen.height - position.state.h) && mass.state.velocityY > 0) {
      mass.state.velocityY = 0
    } else {
      mass.state.velocityY = min([TERMINAL_VELOCITY, mass.state.velocityY + result])
    }
    position.state.y = max([0, min([screen.height - position.state.h, position.state.y + mass.state.velocityY])])
  }
}

