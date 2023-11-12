import {Component} from "javascript-entity-component-system"
import union from "lodash/union"
import max from "lodash/max"
import {screen} from "./screen"

export const InputComponent: Component = {
  name: "input",
  state: {
    commands: []
  }
}

export function listenForInput (window, ECS) {
  let down: boolean = false;

  window.addEventListener('keydown', function (e) {
    const command = toCommand(e.keyCode)
    if (command) {
      e.preventDefault();
      for (const input of getInputComponents(ECS)) {
        input.state.commands = union([command], input.state.commands)
      }
    }
  });

  window.addEventListener('keyup', function (e) {
    const command = toCommand(e.keyCode)
    if (command) {
      for (const input of getInputComponents(ECS)) {
        input.state.commands = input.state.commands.filter(x => command !== x)
      }
    }
  });

  window.addEventListener('touchstart', function (e) {
    for (const touch of e.changedTouches) {
      for (const input of getInputComponents(ECS)) {
        positionInput(ECS, touch.pageX, touch.pageY, input)
      }
    }
    down = true
  });

  window.addEventListener('touchmove', function (e) {
    if (down) {
      for (const touch of e.changedTouches) {
        for (const input of getInputComponents(ECS)) {
          input.state.commands = []
          positionInput(ECS, touch.pageX, touch.pageY, input)
        }
      }
    }
  });

  window.addEventListener('touchend', function (_e) {
    for (const input of getInputComponents(ECS)) {
      input.state.commands = []
    }
    down = false
  });

  window.addEventListener('mousedown', function (e) {
    for (const input of getInputComponents(ECS)) {
      positionInput(ECS, e.pageX, e.pageY, input)
    }
    down = true
  });

  window.addEventListener('mousemove', function (e) {
    if (down) {
      for (const input of getInputComponents(ECS)) {
        input.state.commands = []
        positionInput(ECS, e.pageX, e.pageY, input)
      }
    }
  });

  window.addEventListener('mouseup', function (_e) {
    for (const input of getInputComponents(ECS)) {
      input.state.commands = []
    }
    down = false
  });
}

function positionInput (ECS, x: number, y: number, input) {
  if(((screen.width / 3) * 2) < x) {
    input.state.commands = union(['right'], input.state.commands)
  } else if((screen.width / 3)  > x) {
    input.state.commands = union(['left'], input.state.commands)
  }
  if(getPlayerY(ECS) > y) {
    input.state.commands = union(['up'], input.state.commands)
  }
}

type Command = 'left' | 'right' | 'up' | 'down'

function toCommand (keyCode: number): Command | null {
  switch (keyCode) {
    case 38:
      return 'up'
    case 39:
      return 'right'
    case 37:
      return 'left'
    case 40:
      return 'down'
    default:
      return null;
  }
}

function getInputComponents (ECS): Array<Component> {
  const entities = ECS.getEntitiesFromRequiredComponents(['input'])
  return entities.flatMap(entity =>
    ECS.getEntityComponents(entity, ['input'])
  )
}

function getPlayerY (ECS): number {
  const entity = ECS.getEntity('Player')
  return max(ECS.getEntityComponents(entity, ['position']).map(x => x.state.y))
}
