import { Canvas } from '../modules/Canvas'
import { IWidget } from './widget'

type TDrop = {
  x: number,
  y: number,
  opacity: number,
  r: number
}

export class Rain implements IWidget {
  private readonly CLR_ACCENT: string = 'white'
  private readonly CLR_ADDITIONAL: string = 'DarkSlateGray'
  private readonly DROP_SPEED: number = 3
  private readonly DROP_COUNT: number = 100
  private readonly DROP_RATIO: number = 3
  private readonly DROP_SIZE: number = 5
  private readonly DROP_SIZE_MIN: number = 2
  private readonly MINI_DROP_SPEED: number = 4
  private readonly MINI_DROP_COUNT: number = 3
  private readonly MINI_DROP_OPACITY_DECREMENT: number = 0.05
  private drops: TDrop[] = []
  private miniDrops: TDrop[] = []

  private canvas: Canvas

  constructor () {
    this.canvas = new Canvas('rain')
    this.createDrops()
    this.tick = this.tick.bind(this)
  }

  private drawSky (): void {
    this.canvas.context.fillStyle = this.CLR_ADDITIONAL

    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height)
    this.canvas.context.fill()
  }

  private createDrops (): void {
    for (let i = 0; i < this.DROP_COUNT; i++) {
      const size = Math.random() * (this.DROP_SIZE - this.DROP_SIZE_MIN) + this.DROP_SIZE_MIN

      this.drops.push({
        x: Math.random() * this.canvas.element.width,
        y: Math.random() * this.canvas.element.height * -1 - size,
        opacity: Math.random(),
        r: size
      })
    }
  }

  private createMiniDrops (drop: TDrop): void {
    for (let i = 0; i < this.MINI_DROP_COUNT; i++) {
      const size = Math.random() * this.DROP_SIZE_MIN

      this.miniDrops.push({
        x: drop.x,
        y: this.canvas.element.height - size,
        opacity: 1,
        r: size
      })
    }

    drop.y = -drop.r
  }

  private drawDrops (): void {
    for (const drop of this.drops) {
      this.canvas.context.fillStyle = `rgba(255, 255, 255, ${drop.opacity})`

      this.canvas.context.beginPath()
      this.canvas.context.ellipse(drop.x, drop.y, drop.r, drop.r / this.DROP_RATIO, Math.PI / 2, 0, Math.PI * 2)
      this.canvas.context.fill()
    }
  }

  private drawMiniDrops (): void {
    for (const drop of this.miniDrops) {
      this.canvas.context.fillStyle = `rgba(255, 255, 255, ${drop.opacity})`

      this.canvas.context.beginPath()
      this.canvas.context.ellipse(drop.x, drop.y, drop.r, drop.r / this.DROP_RATIO, Math.PI / 2, 0, Math.PI * 2)
      this.canvas.context.fill()
    }
  }

  private updateDrops (): void {
    for (const drop of this.drops) {
      if (drop.y > this.canvas.element.height + drop.r) {
        drop.y = -drop.r
        this.createMiniDrops(drop)
      }

      if (drop.x > this.canvas.element.width + drop.r) {
        drop.x = -drop.r
      }

      drop.y += this.DROP_SPEED
      drop.x += 0.3
    }
  }

  private updateMiniDrops (): void {
    this.miniDrops.forEach((miniDrop, index) => {
      if (miniDrop.opacity < 0) {
        this.miniDrops.splice(index, 1)
      }

      miniDrop.opacity -= this.MINI_DROP_OPACITY_DECREMENT
      miniDrop.x -= Math.random() * this.MINI_DROP_SPEED
      miniDrop.y -= this.MINI_DROP_SPEED
    })
  }

  private tick (): void {
    this.canvas.clear()

    this.drawSky()
    this.drawDrops()
    this.drawMiniDrops()

    this.updateDrops()
    this.updateMiniDrops()
  }

  public start (): void {
    this.canvas.startAnimation(this.tick)
  }
}
