import { Canvas } from '../modules/Canvas'
import { IWidget } from './widget'

type TLineProps = {
  x1: number, y1: number, p1x: number, p1y: number, x2: number, y2: number, p2x: number, p2y: number, angle: number, r: number
}

export class Bezier implements IWidget {
  private readonly CLR_BG: string = 'blue'
  private readonly CLR_LINE: string = 'rgba(255, 255, 255, 0.25)'
  private readonly LINE_WIDTH: number = 3
  private readonly LINES_COUNT: number = 200
  private readonly SPEED: number = 0.025
  private readonly R: number = 2
  private readonly R_MIN: number = 1

  private lines: TLineProps[] = []
  private canvas: Canvas

  constructor () {
    this.canvas = new Canvas('bezier')
    this.generateLines()
    this.tick = this.tick.bind(this)
  }

  private generateLines (): void {
    this.lines = []

    for (let i = 1; i <= this.LINES_COUNT; i++) {
      this.lines.push({
        x1: 0,
        y1: (this.canvas.element.height / this.LINES_COUNT) * i,
        p1x: this.canvas.centerX * Math.random(),
        p1y: this.canvas.centerY * Math.random() + this.canvas.centerY,
        p2x: this.canvas.centerX * Math.random() + this.canvas.centerX,
        p2y: this.canvas.centerY * Math.random(),
        x2: this.canvas.element.width,
        y2: (this.canvas.element.height / this.LINES_COUNT) * i,
        angle: Math.random() * (Math.PI * 2),
        r: Math.random() * (this.R - this.R_MIN) + this.R_MIN
      })
    }
  }

  private drawBezier ({ x1, y1, p1x, p1y, x2, y2, p2x, p2y }: TLineProps) {
    this.canvas.context.strokeStyle = this.CLR_LINE
    this.canvas.context.lineWidth = this.LINE_WIDTH

    this.canvas.context.beginPath()
    this.canvas.context.moveTo(x1, y1)
    this.canvas.context.bezierCurveTo(p1x, p1y, p2x, p2y, x2, y2)
    this.canvas.context.stroke()
  }

  private updateLineProps (line: TLineProps): void {
    line.p1y -= Math.cos(line.angle) * line.r
    line.p2y += Math.cos(-line.angle) * line.r

    line.angle += this.SPEED
  }

  private tick (): void {
    this.canvas.context.fillStyle = this.CLR_BG
    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height)

    for (const line of this.lines) {
      this.drawBezier(line)
      this.updateLineProps(line)
    }
  }

  public start (): void {
    this.canvas.startAnimation(this.tick)
  }
}
