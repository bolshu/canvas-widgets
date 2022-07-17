import { Canvas } from '../modules/Canvas'
import { IWidget } from './widget'

export class Sin implements IWidget {
  private readonly OFFSET: number = 250
  private readonly AXIS_OFFSET: number = 40
  private readonly AMPLITUDE: number = 0.05
  private readonly SPEED: number = 0.03
  private readonly R: number = (this.OFFSET / 4) * 2
  private readonly POINT_R: number = 5
  private readonly CLR_ACCENT: string = 'black'
  private readonly CLR_ADDITIONAL: string = 'white'
  private readonly STROKE_WIDTH: number = 3
  private dx: number = 0
  private dy: number = 0
  private angle: number = 0
  private canvas: Canvas

  constructor () {
    this.canvas = new Canvas('sin')
    this.tick = this.tick.bind(this)
  }

  private drawStatic (): void {
    this.canvas.context.strokeStyle = this.CLR_ADDITIONAL
    this.canvas.context.lineWidth = this.STROKE_WIDTH

    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height)
    this.canvas.context.fillStyle = this.CLR_ACCENT
    this.canvas.context.fill()

    const drawCircle = () => {
      this.canvas.context.beginPath()
      this.canvas.context.arc(this.OFFSET, this.OFFSET, this.R, 0, Math.PI * 2)
      this.canvas.context.stroke()
    }

    const drawXTopAxis = () => {
      this.canvas.context.beginPath()
      this.canvas.context.moveTo(this.OFFSET, this.OFFSET - this.R)
      this.canvas.context.lineTo(this.canvas.element.width, this.OFFSET - this.R)
      this.canvas.context.stroke()
    }

    const drawXBottomAxis = () => {
      this.canvas.context.beginPath()
      this.canvas.context.moveTo(this.OFFSET, this.OFFSET + this.R)
      this.canvas.context.lineTo(this.canvas.element.width, this.OFFSET + this.R)
      this.canvas.context.stroke()
    }

    const drawXAdditionalAxis = () => {
      this.canvas.context.beginPath()
      this.canvas.context.moveTo(this.OFFSET + this.R + this.AXIS_OFFSET, this.OFFSET - this.R)
      this.canvas.context.lineTo(this.OFFSET + this.R + this.AXIS_OFFSET, this.OFFSET + this.R)
      this.canvas.context.stroke()
    }

    drawCircle()
    drawXTopAxis()
    drawXBottomAxis()
    drawXAdditionalAxis()
  }

  private drawDot (x: number, y: number): void {
    this.canvas.context.strokeStyle = this.CLR_ADDITIONAL
    this.canvas.context.fillStyle = this.CLR_ACCENT
    this.canvas.context.beginPath()
    this.canvas.context.arc(x, y, this.POINT_R, 0, Math.PI * 2)
    this.canvas.context.fill()
    this.canvas.context.stroke()
  }

  private drawXLine (): void {
    this.canvas.context.strokeStyle = this.CLR_ADDITIONAL
    this.canvas.context.beginPath()
    this.canvas.context.moveTo(this.dx, this.dy)
    this.canvas.context.lineTo(this.canvas.element.width, this.dy)
    this.canvas.context.stroke()
  }

  private drawR (): void {
    this.canvas.context.strokeStyle = this.CLR_ADDITIONAL
    this.canvas.context.beginPath()
    this.canvas.context.moveTo(this.OFFSET, this.OFFSET)
    this.canvas.context.lineTo(this.dx, this.dy)
    this.canvas.context.stroke()
  }

  private drawSinLine (): void {
    let x = 0

    this.canvas.context.beginPath()

    while (x < this.canvas.element.width + this.STROKE_WIDTH) {
      const y = this.R * Math.sin(this.angle + x * this.AMPLITUDE) + this.OFFSET

      this.canvas.context.lineTo(x + this.OFFSET + this.R + this.AXIS_OFFSET, y)
      x += 1
    }

    this.canvas.context.stroke()
  }

  private updateCirclePointCoords (): void {
    this.angle += this.SPEED
    this.dx = this.R * Math.cos(this.angle) + this.OFFSET
    this.dy = this.R * Math.sin(this.angle) + this.OFFSET
  }

  private tick (): void {
    this.canvas.clear()

    this.drawStatic()
    this.drawXLine()
    this.drawR()
    this.drawSinLine()
    this.drawDot(this.dx, this.dy)
    this.drawDot(this.OFFSET + this.R + this.AXIS_OFFSET, this.dy)

    this.updateCirclePointCoords()
  }

  public start (): void {
    this.canvas.startAnimation(this.tick)
  }
}
