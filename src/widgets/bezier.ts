import { Canvas } from '../modules/Canvas'
import { IWidget } from './widget'

export class Bezier implements IWidget {
  private canvas: Canvas

  constructor () {
    this.canvas = new Canvas('bezier')
    this.tick = this.tick.bind(this)
  }

  private tick (): void {
    this.canvas.clear()

    this.canvas.context.fillStyle = 'tomato'
    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height)
  }

  public start (): void {
    this.canvas.startAnimation(this.tick)
  }
}
