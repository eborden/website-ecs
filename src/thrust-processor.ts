import {Component, Entity, Processor} from "javascript-entity-component-system"
import min from 'lodash/min'
import max from 'lodash/max'
import * as screen from './screen'
import {camera} from './camera'

export const ThrustProcessor: Processor = {
  name: "thrust_processor",
  required: ["position", "mass"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [position, mass] = components
    position.state.x = max([0, min([position.state.x + mass.state.velocityX, camera.maxX + screen.width])])
  }
}
