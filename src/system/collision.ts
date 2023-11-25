import {Component, Entity, Processor} from "javascript-entity-component-system"

export const CollisionProcessor = (colliders: Entity[]): Processor => ({
  name: "collision_processor",
  required: ["position", "mass"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [position, mass] = components
    for (const collider of colliders) {
      const colliderPosition = makePosition(collider.components[0])
      let collision = checkCollision(makePosition(position), colliderPosition)
      if (collision.length > 0) {
        for(const side of collision) {
          switch (side) {
            case 'left':
            case 'right':
              // For low values just set to 0.
              if (Math.abs(mass.state.velocityX) < 4) {
                mass.state.velocityX = 0
              } else {
                mass.state.velocityX = (-mass.state.velocityX) * 0.5
              }
              break
            case 'top':
            case 'bottom':
              mass.state.velocityY = 0
              break
            default:
              break
          }
        }
        let i = 0
        while (collision.length > 0 && ++i < 100) {
          for(const side of collision) {
            switch (side) {
              case 'left':
                position.state.x -= 1
                break
              case 'right':
                position.state.x += 1
                break
              case 'top':
                position.state.y -= 1
                break
              case 'bottom':
                position.state.y += 1
                break
              default:
                break
            }
            collision = checkCollision(makePosition(position), colliderPosition)
          }
        }
      }
    }
  }
})

type Position = {x: number, y: number, w: number, h: number}

function makePosition(component: Component): Position {
  return {
    x: component.state.x,
    y: component.state.y,
    w: component.state.w,
    h: component.state.h
  }
}

type Side = 'top' | 'right' | 'bottom' | 'left'

function checkCollision(a: Position, b: Position): Side[] {
  const sides = []
  for (const [bound, type] of makeChecks(b)) {
    if (checkBoundingIntersection(bound, a)) sides.push(type)
  }
  return sides
}

function makeChecks(a: Position): Array<[Position, Side]> {
  const halfH = a.h/2
  const halfW = a.w/2

  const top = {x: a.x + 5, y: a.y, w: a.w - 10, h: halfH}
  const bottom = {x: a.x + 5, y: a.y + halfH, w: a.w - 10, h: halfH}
  const left = {x: a.x, y: a.y + 5, w: halfW, h: a.h - 10}
  const right = {x: a.x + halfW, y: a.y + 5, w: halfW, h: a.h - 10}

  return [
    [right, 'right'],
    [left, 'left'],
    [top, 'top'],
    [bottom, 'bottom']
  ]
}

function checkBoundingIntersection(a: Position, b: Position): boolean {
  if (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  ) {
    return true
  }
  return false;
}
