export function init(ECS, colliders) {
  for (var elem of window.document.querySelectorAll('.box, input')) {
    const box = ECS.createEntity(
      "Box",
      ["position"],
      []
    )
    const {x, y, width} = elem.getBoundingClientRect()
    console.log({x, y, width})
    const [position] = ECS.getEntityComponents(box, ['position'])
    position.state.h = 10
    position.state.w = width
    position.state.x = x
    position.state.y = y
    ECS.addEntity(box)
    colliders.push(box)
  }
}

