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
    left: camera.x - 20,
    top: -20,
    right: camera.x + screen.width + 20,
    bottom: screen.height + 20
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

export function getCachedBoundingBox(component: Component): BoundingBox {
  const cached = boundingCache.get(component)
  if (cached) {
    return cached
  }
  const box = makeBoundingBox(component)
  boundingCache.set(component, box)
  return box
}

const boundingCache: Map<Component, BoundingBox> = new Map([])
