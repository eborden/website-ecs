import {screen} from '../screen'

export function init (ECS) {
  const player = ECS.createEntity(
    "Player",
    ["position", "mass", "input"],
    ["gravity_processor", "thrust_processor", "drag_processor", "collision_processor", "input_processor", "camera_processor", "player_render_processor"]
  )
  const [position] = ECS.getEntityComponents(player, ['position'])
  position.state.x = screen.width / 2
  position.state.h = 30
  position.state.w = 25
  ECS.addEntity(player)
}
