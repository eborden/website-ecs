import {Component} from "javascript-entity-component-system"

export const MassComponent: Component = {
  name: "mass",
  state: {
    mass: 1.5,
    velocityX: 0,
    velocityY: 0
  }
}
