import {Entity, Processor, Component} from "javascript-entity-component-system"
import {roundRect} from './render'
import {camera} from './camera'

export const PlayerRenderProcessor = (ctx) : Processor => ({
  name: "player_render_processor",
  required: ["position", "input"],
  update(_entity: Entity, components: Component[], _processor: Processor) {
    const [position, input] = components
    const {y, h, w} = position.state
    const x = position.state.x - camera.x
    const {commands} = input.state
    if (commands.includes('left')) {
      /*body*/
      roundRect(ctx, x + (w * 0.2), y + (h * 0.4), w - (w * 0.4), h - (h * 0.4), 5, '#665849');
      /*ears*/
      roundRect(ctx, x + (w / 2), y - (h / 10), w / 3, h / 3, 5, '#665849');
      /*head*/
      roundRect(ctx, x + (w * 0.05), y, w - (w * 0.1), h - (h * 0.6), 5, '#665849');
      roundRect(ctx, x, y + (h * 0.05), w * 0.6, h - (h * 0.65), 5, '#DBB784');
    } else if (commands.includes('right')) {
      /*body*/
      roundRect(ctx, x + (w * 0.2), y + (h * 0.4), w - (w * 0.4), h - (h * 0.4), 5, '#665849');
      /*ears*/
      roundRect(ctx, x + (w / 2) - (w / 3), y - (h / 10), w / 3, h / 3, 5, '#665849');
      /*head*/
      roundRect(ctx, x + (w * 0.05), y, w - (w * 0.1), h - (h * 0.6), 5, '#665849');
      roundRect(ctx, x + (w * 0.4), y + (h * 0.1), w - (w * 0.4), h - (h * 0.7), 5, '#DBB784');
    } else {
      /*body*/
      roundRect(ctx, x + (w * 0.2), y + (h * 0.4), w - (w * 0.4), h - (h * 0.4), 5, '#665849');
      /*ears*/
      roundRect(ctx, x, y - (h / 10), w / 3, h / 3, 5, '#665849');
      roundRect(ctx, x + (w - (w/3)), y - (h / 10), w / 3, h / 3, 5, '#665849');
      /*HEAD*/
      roundRect(ctx, x, y, w, h - (h * 0.6), 5, '#665849');
      roundRect(ctx, x + (w * 0.1), y + (h * 0.1), w - (w * 0.2), h - (h * 0.7), 5, '#DBB784');
    }
  }
})
