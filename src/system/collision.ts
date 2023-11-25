import {Component, Entity, Processor} from "javascript-entity-component-system"
import {BoundingBox, makeBoundingBox, checkBoundingIntersection} from "../bounding-box"
import intersection from "lodash/intersection"

export const CollisionProcessor = (colliders: Entity[]): Processor => ({
  name: "collision_processor",
  required: ["position", "mass"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [position, mass] = components
    for (const collider of colliders) {
      const colliderBoundingBox = makeBoundingBox(collider.components[0])
      let collision = checkCollision(makeBoundingBox(position), colliderBoundingBox)
      let i = 0
      if (intersection(collision, ['top', 'bottom']).length > 0) {
        mass.state.velocityY = 0
      }
      do {
        collision = checkCollision(makeBoundingBox(position), colliderBoundingBox)
        for(const side of collision) {
          switch (side) {
            case 'top':
              position.state.y -= 1
              break
            case 'bottom':
              position.state.y += 1
              break
            default:
              break
          }
        }
      } while (collision.length > 0 && ++i < position.state.h)

      if (intersection(collision, ['left', 'right']).length > 0) {
        mass.state.velocityX = 0
      }
      i = 0
      do {
        collision = checkCollision(makeBoundingBox(position), colliderBoundingBox)
        for(const side of collision) {
          switch (side) {
            case 'left':
              position.state.x -= 1
              break
            case 'right':
              position.state.x += 1
              break
            default:
              break
          }
        }
      } while (collision.length > 0 && ++i < position.state.w)
    }
  }
})

type Side = 'top' | 'right' | 'bottom' | 'left'

function checkCollision(a: BoundingBox, b: BoundingBox): Side[] {
  const sides = []
  for (const [bound, type] of makeChecks(b)) {
    if (checkBoundingIntersection(bound, a)) sides.push(type)
  }
  return sides
}

function makeChecks(a: BoundingBox): Array<[BoundingBox, Side]> {
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
