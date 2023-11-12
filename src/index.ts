import {EntityComponentSystem} from "javascript-entity-component-system"
import {PositionComponent} from "./component/position"
import {ColorComponent} from "./component/color"
import {MassComponent} from "./component/mass"
import {InputComponent, listenForInput} from "./component/input"
import {GravityProcessor} from "./system/gravity"
import {ThrustProcessor} from "./system/thrust"
import {DragProcessor} from "./system/drag"
import {WindProcessor} from "./system/wind"
import {EdgeRespawnProcessor} from "./system/edge-respawn"
import {InputProcessor} from "./system/input"
import {WiggleProcessor} from "./system/wiggle"
import {CollisionProcessor} from "./system/collision"
import {SceneRenderProcessor} from "./system/scene-render"
import {PlayerRenderProcessor} from "./system/player-render"
import {CameraProcessor, positionScreens} from "./system/camera"
import {screen} from './screen'
import * as clouds from './entity/clouds'
import * as hills from './entity/hills'
import * as leaves from './entity/leaves'
import * as trees from './entity/trees'
import * as player from './entity/player'
import * as boxes from './entity/html-collision-boxes'

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

player.init(ECS)
clouds.init(ECS)
hills.init(ECS)
trees.init(ECS, colliders)
leaves.init(ECS)

document.body.style.width = screen.width + 'px'
positionScreens()

boxes.init(ECS, colliders)

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
