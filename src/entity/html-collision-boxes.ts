import {screen} from '../screen'
import {camera} from '../system/camera'

export function init(ECS, colliders) {
  const floor = makeBox(ECS, {x: 0, y: screen.height, width: camera.maxX, height: 10})
  ECS.addEntity(floor)
  colliders.push(floor)

  const ceiling = makeBox(ECS, {x: 0, y: -10, width: camera.maxX, height: 10})
  ECS.addEntity(ceiling)
  colliders.push(ceiling)

  for (var elem of window.document.querySelectorAll('.box, input')) {
    const {x, y, width, height} = elem.getBoundingClientRect()
    const box = makeBox(ECS, {x, y, width, height})
    ECS.addEntity(box)
    colliders.push(box)
  }
}

function makeBox (ECS, {x, y, width, height}) {
  const box = ECS.createEntity(
    "Box",
    ["position"],
    []
  )
  const [position] = ECS.getEntityComponents(box, ['position'])
  position.state.h = height
  position.state.w = width
  position.state.x = x
  position.state.y = y
  return box
}
