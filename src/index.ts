import {EntityComponentSystem} from "javascript-entity-component-system"
import {PositionComponent} from "./position"
import {ColorComponent} from "./color"
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
import * as clouds from './clouds'
import * as hills from './hills'
import * as leaves from './leaves'
import * as trees from './trees'
import * as player from './player'

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
