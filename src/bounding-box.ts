import {Component} from "javascript-entity-component-system"
import {camera} from './system/camera'
import {screen} from './screen'

export type BoundingBox = {x: number, y: number, w: number, h: number}

export function cameraBoundingBox(): BoundingBox {
  return {
    x: camera.x,
    y: 0,
    w: camera.x + screen.width,
    h: screen.height
  }
}

export function makeBoundingBox(component: Component): BoundingBox {
  return {
    x: component.state.x,
    y: component.state.y,
    w: component.state.w,
    h: component.state.h
  }
}

export function checkBoundingIntersection(a: BoundingBox, b: BoundingBox): boolean {
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
