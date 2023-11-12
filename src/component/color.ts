import {Component} from "javascript-entity-component-system"
import random from 'lodash/random'

export const ColorComponent: Component = {
  name: "color",
  state: {
    hex: '#B86821'
  }
}

const FALL_COLORS = ['B86821', 'F3D30C', 'E1512C', '507A3A'];

export const randomColor = (): string => {
  return '#' + FALL_COLORS[random(0, FALL_COLORS.length - 1)]
}
