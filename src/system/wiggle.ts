import {Component, Entity, Processor} from "javascript-entity-component-system"
import {state} from '../tick'

const WIGGLE = [
  new Array(18).fill(0),
  new Array(12).fill(0.2),
  new Array(6).fill(0.4),
  new Array(6).fill(0.6),
  new Array(6).fill(0.4),
  new Array(12).fill(0.2),
  new Array(18).fill(0),
  new Array(12).fill(-0.2),
  new Array(6).fill(-0.4),
  new Array(6).fill(-0.6),
  new Array(6).fill(-0.4),
  new Array(12).fill(-0.2),
].flatMap(x => x)

export const WiggleProcessor: Processor = {
  name: "wiggle_processor",
  required: ["mass", "position"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [mass, position] = components
    mass.state.velocityY = WIGGLE[Math.round(position.state.x + state.tick) % WIGGLE.length]
  }
}
