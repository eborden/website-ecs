import {Component, Entity, Processor} from "javascript-entity-component-system"
import min from 'lodash/min'
import max from 'lodash/max'

const MAX_VELOCITY = 14
const MIN_VELOCITY = -MAX_VELOCITY

export const InputProcessor: Processor = {
  name: "input_processor",
  required: ["input", "mass"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [input, mass] = components

    for(const command of input.state.commands) {
      switch (command) {
        case 'right':
          mass.state.velocityX = min([MAX_VELOCITY, mass.state.velocityX + 2])
          break;
        case 'left':
          mass.state.velocityX = max([MIN_VELOCITY, mass.state.velocityX - 2])
          break;
        case 'up':
          mass.state.velocityY = max([MIN_VELOCITY, mass.state.velocityY - 2.5])
          break;
        default:
          break;
      }
    }
  }
}
