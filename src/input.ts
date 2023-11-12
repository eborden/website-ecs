import {Component} from "javascript-entity-component-system"
import union from "lodash/union"

export const InputComponent: Component = {
  name: "input",
  state: {
    commands: []
  }
}

export function listenForInput (window, ECS) {
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
}

type Command = 'left' | 'right' | 'up'

function toCommand (keyCode: number): Command | null {
  switch (keyCode) {
    case 38:
      return 'up'
    case 39:
      return 'right'
    case 37:
      return 'left'
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
