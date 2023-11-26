import {screen} from '../screen'
import {camera} from '../system/camera'

export function init(ECS, colliders) {
  const left = makeBox(ECS, {x: -100, y: 0, width: 100, height: screen.height})
  ECS.addEntity(left)
  colliders.push(left)

  const right = makeBox(ECS, {x: camera.maxX, y: 0, width: 100, height: screen.height})
  ECS.addEntity(right)
  colliders.push(right)

  const floor = makeBox(ECS, {x: 0, y: screen.height, width: camera.maxX, height: 100})
  ECS.addEntity(floor)
  colliders.push(floor)

  const ceiling = makeBox(ECS, {x: 0, y: -100, width: camera.maxX, height: 100})
  ECS.addEntity(ceiling)
  colliders.push(ceiling)

  const elems = window.document.querySelectorAll('.box, input, textarea, button')
  for (var elem of elems) {
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
