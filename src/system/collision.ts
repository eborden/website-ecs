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
      const {velocityX: vx, velocityY: vy} = mass.state
      let collision = checkCollision(vx, vy, makeBoundingBox(position), colliderBoundingBox)

      // Handle vertical collisions first to favor gravity
      if (intersection(collision, ['top', 'bottom']).length > 0) {
        mass.state.velocityY = 0
      }
      let i = 0
      do {
        collision = checkCollision(vx, vy, makeBoundingBox(position), colliderBoundingBox)
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

      // Handle horizontal collisions
      if (intersection(collision, ['left', 'right']).length > 0) {
        mass.state.velocityX = 0
      }
      i = 0
      do {
        collision = checkCollision(vx, vy, makeBoundingBox(position), colliderBoundingBox)
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

function checkCollision(vx: number, vy: number, a: BoundingBox, b: BoundingBox): Side[] {
  const sides = []
  for (const [bound, type] of makeChecks(vx, vy, b)) {
    if (checkBoundingIntersection(bound, a)) sides.push(type)
  }
  return sides
}

function makeChecks(vx: number, vy: number, a: BoundingBox): Array<[BoundingBox, Side]> {
  const halfH = a.h/2
  const halfW = a.w/2

  const checks = []
  if (vy > 0) checks.push([{x: a.x + 5, y: a.y, w: a.w - 10, h: halfH}, 'top'])
  if (vy < 0) checks.push([{x: a.x + 5, y: a.y + halfH, w: a.w - 10, h: halfH}, 'bottom'])
  if (vx > 0) checks.push([{x: a.x, y: a.y + 5, w: halfW, h: a.h - 10}, 'left'])
  if (vx < 0) checks.push([{x: a.x + halfW, y: a.y + 5, w: halfW, h: a.h - 10}, 'right'])
  return checks
}
