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

export function luminance(hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;
  // convert to decimal and change luminosity
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }
  return rgb;
}
