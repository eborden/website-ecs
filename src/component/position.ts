import {Component} from "javascript-entity-component-system"
import random from 'lodash/random'
import fill from 'lodash/fill'
import {camera} from '../system/camera'

export const PositionComponent: Component = {
  name: "position",
  state: {
    x: 0,
    y: 0,
    h: 0,
    w: 0
  }
}

export function randomPositions (num: number): number[] {
  return fill(new Array(num), camera.maxX).map(x => random(0, x))
}
