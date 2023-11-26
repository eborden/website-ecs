import {Component, Entity, Processor} from "javascript-entity-component-system"
import {
  BoundingBox,
  makeBoundingBox,
  getCachedBoundingBox,
  checkBoundingIntersection,
  cameraBoundingBox
} from "../bounding-box"
import intersection from "lodash/intersection"

export const CollisionProcessor = (colliders: Entity[]): Processor => ({
  name: "collision_processor",
  required: ["position", "mass"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [position, mass] = components
    for (const collider of colliders) {
      const colliderBoundingBox = getCachedBoundingBox(collider.components[0])

      // Only check colliders on screen
      if (!checkBoundingIntersection(colliderBoundingBox, cameraBoundingBox())) {
        continue
      }

      const {velocityX: vx, velocityY: vy} = mass.state
      const check = () =>
        checkCollision(vx, vy, makeBoundingBox(position), colliderBoundingBox)
      let collision = check()

      if (collision.length > 0) {
        // Handle vertical collisions first to favor gravity
        if (intersection(collision, ['top', 'bottom']).length > 0) {
          mass.state.velocityY = 0
        }
        let i = 0
        do {
          collision = check()
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
          collision = check()
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
  }
})

type Side = 'top' | 'right' | 'bottom' | 'left'

function checkCollision(vx: number, vy: number, a: BoundingBox, b: BoundingBox): Side[] {
  const sides = []
  for (const [type, bound] of makeChecks(vx, vy, b)) {
    if (checkBoundingIntersection(bound, a)) sides.push(type)
  }
  return sides
}

function makeChecks(vx: number, vy: number, a: BoundingBox): Array<[Side, BoundingBox]> {
  const checks = []
  if (vy > 0) checks.push(['top', {
    left: a.left + 5,
    top: a.top,
    right: a.right - 5,
    bottom: a.bottom
  }])
  if (vy < 0) checks.push(['bottom', {
    left: a.left + 5,
    top: a.top,
    right: a.right - 5,
    bottom: a.bottom
  }])
  if (vx > 0) checks.push(['left', {
    right: a.right,
    top: a.top + 5,
    left: a.left,
    bottom: a.bottom - 5
  }])
  if (vx < 0) checks.push(['right', {
    left: a.left,
    top: a.top + 5,
    right: a.right,
    bottom: a.bottom - 5
  }])
  return checks
}
