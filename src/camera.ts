import {Component, Entity, Processor} from "javascript-entity-component-system"
import min from 'lodash/min'
import max from 'lodash/max'
import {screen} from './screen'

export const camera = {
  x: 0,
  maxX: screen.width * document.querySelectorAll('article').length
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
  const articles = Array.from(document.querySelectorAll('article'))
  articles.unshift()
  articles.forEach((article, i) => {
    article.style.left = ((screen.width * i) - camera.x) + 'px'
  })
}
