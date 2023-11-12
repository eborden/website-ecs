import {Component, Entity, Processor} from "javascript-entity-component-system"
import min from 'lodash/min'
import max from 'lodash/max'
import {screen} from './screen'

export const camera = {
  x: 0,
  maxX: screen.width * 3
}

export const CameraProcessor: Processor = {
  name: "camera_processor",
  required: ["mass", "position"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [mass, position] = components
    if (screen.width/2 < position.state.x && position.state.x < (camera.maxX - (screen.width/2))) {
      camera.x = max([0, min([camera.x + mass.state.velocityX, camera.maxX])])
      positionScreens()
    }
  }
}

export function positionScreens() {
  // move html screens
  const screen1 = document.getElementById('screen-1')
  screen1.style.left = -camera.x + 'px'
  const screen2 = document.getElementById('screen-2')
  screen2.style.left = (screen.width - camera.x) + 'px'
  const screen3 = document.getElementById('screen-3')
  screen3.style.left = ((screen.width * 2) - camera.x) + 'px'
}
