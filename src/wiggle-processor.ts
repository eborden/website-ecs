import {Component, Entity, Processor} from "javascript-entity-component-system"
import random from 'lodash/random'

const WIGGLE = [-1, 1]

export const WiggleProcessor: Processor = {
  name: "wiggle_processor",
  required: ["mass"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [mass] = components
    mass.state.velocityY = WIGGLE[random(0, 1)] * mass.state.velocityY
  }
}
