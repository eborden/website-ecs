import random from 'lodash/random'
import {EntityComponentSystem} from "javascript-entity-component-system"
import {PositionComponent, randomPositions} from "./position"
import {ColorComponent, randomColor} from "./color"
import {MassComponent} from "./mass"
import {InputComponent, listenForInput} from "./input"
import {GravityProcessor} from "./gravity-processor"
import {ThrustProcessor} from "./thrust-processor"
import {DragProcessor} from "./drag-processor"
import {WindProcessor} from "./wind-processor"
import {EdgeRespawnProcessor} from "./edge-respawn-processor"
import {InputProcessor} from "./input-processor"
import {WiggleProcessor} from "./wiggle-processor"
import {CollisionProcessor} from "./collision-processor"
import {SceneRenderProcessor} from "./scene-render-processor"
import {PlayerRenderProcessor} from "./player-render-processor"
import {CameraProcessor} from "./camera"
import {screen} from './screen'

const playerCanvas = <HTMLCanvasElement> document.getElementById("player")
playerCanvas.width = screen.width
playerCanvas.height = screen.height
const playerCtx = playerCanvas.getContext("2d");
const sceneCanvas = <HTMLCanvasElement> document.getElementById("scene")
sceneCanvas.width = screen.width
sceneCanvas.height = screen.height
const sceneCtx = sceneCanvas.getContext("2d");
const colliders = []

const ECS = new EntityComponentSystem()

ECS.addComponent(PositionComponent)
ECS.addComponent(ColorComponent)
ECS.addComponent(MassComponent)
ECS.addComponent(InputComponent)
ECS.addProcessor(GravityProcessor)
ECS.addProcessor(ThrustProcessor)
ECS.addProcessor(WindProcessor)
ECS.addProcessor(WiggleProcessor)
ECS.addProcessor(CollisionProcessor(colliders))
ECS.addProcessor(DragProcessor)
ECS.addProcessor(InputProcessor)
ECS.addProcessor(CameraProcessor)
ECS.addProcessor(EdgeRespawnProcessor)
ECS.addProcessor(SceneRenderProcessor(sceneCtx))
ECS.addProcessor(PlayerRenderProcessor(playerCtx))

const player = ECS.createEntity(
  "Player",
  ["position", "mass", "input"],
  ["gravity_processor", "thrust_processor", "drag_processor", "collision_processor", "input_processor", "camera_processor", "player_render_processor"]
)
player.components[0].state.x = screen.width / 2
player.components[0].state.h = 30
player.components[0].state.w = 25
ECS.addEntity(player)

for (var x of randomPositions(30)) {
  const cloud = ECS.createEntity(
    "Cloud",
    ["position", "color", "mass"],
    ["wind_processor", "edge_respawn_processor", "scene_render_processor"]
  )
  const [position, color, _] = cloud.components
  position.state.h = 30 - random(0, 20)
  position.state.w = 200 - random(0, 50)
  position.state.x = x
  position.state.y = (screen.height/3) - random(0, screen.height/4)
  color.state.hex = '#FFFFFF'
  ECS.addEntity(cloud)
}

for (var x of randomPositions(50)) {
  const hill = ECS.createEntity(
    "Hill",
    ["position", "color"],
    ["scene_render_processor"]
  )
  const [position, color] = hill.components
  position.state.h = 100 - random(0, 50)
  position.state.w = 400 - random(0, 20)
  position.state.x = x
  position.state.y = screen.height
  color.state.hex = randomColor()
  ECS.addEntity(hill)
}

for (var x of randomPositions(50)) {
  const tree = ECS.createEntity(
    "Tree",
    ["position", "color"],
    ["scene_render_processor"]
  )
  const [position, color] = tree.components
  position.state.h = 100 - random(0, 50)
  position.state.w = 40 - random(0, 20)
  position.state.x = x
  position.state.y = screen.height - position.state.h
  color.state.hex = randomColor()
  ECS.addEntity(tree)
  colliders.push(tree)
}

for (var x of randomPositions(100)) {
  const leaf = ECS.createEntity(
    "Leaf",
    ["position", "color", "mass"],
    ["wind_processor", "wiggle_processor", "edge_respawn_processor", "scene_render_processor"]
  )
  const [position, color, mass] = leaf.components
  mass.state.velocityX = random(0.1, 0.7)
  mass.state.velocityY = random(0.1, 0.2)
  position.state.h = 3
  position.state.w = 3
  position.state.x = x
  position.state.y = screen.height - (random(0, screen.height/5) + 10)
  color.state.hex = randomColor()
  ECS.addEntity(leaf)
}

function loop () {
  playerCtx.clearRect(0, 0, screen.width, screen.height)
  sceneCtx.clearRect(0, 0, screen.width, screen.height)
  sceneCtx.fillStyle = '#95CFAE';
  sceneCtx.fillRect(0, 0, screen.width, screen.height);
  ECS.update()
  window.requestAnimationFrame(loop)
}
loop()
listenForInput(window, ECS)
