import {Entity, Processor, Component} from "javascript-entity-component-system"
import {roundRect} from '../draw'
import {cameraBoundingBox, makeBoundingBox, checkBoundingIntersection} from "../bounding-box"
import {camera} from './camera'

export const SceneRenderProcessor = (ctx) : Processor => ({
  name: "scene_render_processor",
  required: ["position", "color"],
  update(entity: Entity, components: Component[], _processor: Processor) {
    const [position, color] = components
    const inView = checkBoundingIntersection(
      cameraBoundingBox(),
      makeBoundingBox(position)
    )
    if (inView) {
      const {y, h, w} = position.state
      const x = position.state.x - camera.x
      switch (entity.name) {
        case 'Tree':
          ctx.fillStyle = '#897723';
          ctx.fillRect(x + (w * 0.3), y + (h * 0.8), w * 0.4, h * 0.2);
          roundRect(ctx, x, y, w, h - (h * 0.2), 10, color.state.hex);
          break;
        case 'Hill':
          ctx.fillStyle = color.state.hex;
          ctx.beginPath();
          ctx.bezierCurveTo(x, y + h, x + (w /2), y, x + w, y + h );
          ctx.fill();
          ctx.closePath();
          break;
        case 'Cloud':
          roundRect(ctx, x, y + (h * 0.4), w, h, 10, color.state.hex);
          roundRect(ctx, x + (w * 0.2), y, w - (w * 0.4), h, 10, color.state.hex);
          break;
        case 'Leaf':
          roundRect(ctx, x, y, w, h, 10, color.state.hex);
          break;
        default:
          console.error(`unknown type: $(entity.type)`)
          break;
      }
    }
  }
})
