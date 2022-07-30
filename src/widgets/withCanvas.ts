import { Canvas } from '../modules/Canvas'

export class WithCanvas {
  protected canvas: Canvas

  constructor (parentNode: HTMLElement) {
    this.canvas = new Canvas(parentNode)
  }
}
