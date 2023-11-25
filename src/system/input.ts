import {Component, Entity, Processor} from "javascript-entity-component-system"
import min from 'lodash/min'
import max from 'lodash/max'
import {screen} from '../screen'

const MAX_VELOCITY = min([screen.width / 120, 12])
const MIN_VELOCITY = -MAX_VELOCITY
const THRUST = max([2, MAX_VELOCITY / 5])

export const InputProcessor: Processor = {
  name: "input_processor",
  required: ["input", "mass"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [input, mass] = components

    for(const command of input.state.commands) {
      switch (command) {
        case 'right':
          mass.state.velocityX = min([MAX_VELOCITY, mass.state.velocityX + THRUST])
          break;
        case 'left':
          mass.state.velocityX = max([MIN_VELOCITY, mass.state.velocityX - THRUST])
          break;
        case 'up':
          mass.state.velocityY = max([MIN_VELOCITY, mass.state.velocityY - (THRUST + 0.5)])
          break;
        case 'down':
          mass.state.velocityY = min([MAX_VELOCITY, mass.state.velocityY + (THRUST + 0.5)])
          break;
        default:
          break;
      }
    }
  }
}
