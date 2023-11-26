import {Component} from "javascript-entity-component-system"
import {camera} from './system/camera'
import {screen} from './screen'

export type BoundingBox = {
  left: number,
  top: number,
  right: number,
  bottom: number
}

export function cameraBoundingBox(): BoundingBox {
  return {
    left: camera.x,
    top: 0,
    right: camera.x + screen.width,
    bottom: screen.height
  }
}

export function makeBoundingBox(component: Component): BoundingBox {
  return {
    left: component.state.x,
    top: component.state.y,
    right: component.state.x + component.state.w,
    bottom: component.state.y + component.state.h
  }
}

export function checkBoundingIntersection(a: BoundingBox, b: BoundingBox): boolean {
  if (
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top
  ) {
    return true
  }
  return false;
}
