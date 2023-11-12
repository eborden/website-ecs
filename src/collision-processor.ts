import {Component, Entity, Processor} from "javascript-entity-component-system"
import {GRAVITY} from "./gravity-processor"

export const CollisionProcessor = (colliders: Entity[]): Processor => ({
  name: "collision_processor",
  required: ["position", "mass"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [position, mass] = components
    for (const collider of colliders) {
      const colliderPosition = collider.components[0]
      const collision = checkCollision({
          x: position.state.x,
          y: position.state.y,
          w: position.state.w,
          h: position.state.h
      }, {
          x: colliderPosition.state.x,
          y: colliderPosition.state.y,
          w: colliderPosition.state.w,
          h: colliderPosition.state.h
      })
      if (collision) {
        mass.state.velocityX = (-mass.state.velocityX) * 0.8
        mass.state.velocityY = -GRAVITY * mass.state.mass
      }

    }
  }
})

type Position = {x: number, y: number, w: number, h: number}

function checkCollision(a: Position, b: Position): boolean {
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
