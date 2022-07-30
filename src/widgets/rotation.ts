import { IWidget } from './types'
import { WithCanvas } from './withCanvas'

type TStar = {
  x: number;
  y: number;
  r: number;
  color: string;
}

export class Rotation extends WithCanvas implements IWidget {
  private readonly STARS_COUNT: number = 200
  private readonly STAR_R_MIN: number = 1
  private readonly STAR_BLUR_R: number = 15
  private readonly APLHA_MAX: number = 1
  private readonly APLHA_MIN: number = 0.03
  private readonly APLHA_INC: number = 0.05
  private readonly RADIANS_INC: number = 0.003
  private readonly stars: TStar[] = []
  private radians: number = 0
  private alpha: number = 0.05
  private isEffectApplied = false
  private maxSideSize: number

  constructor (parentNode: HTMLElement) {
    super(parentNode)

    this.maxSideSize = Math.max(this.canvas.element.width, this.canvas.element.height)

    this.createStars()
    this.addMouseDownListener()
    this.addMouseUpListener()

    this.tick = this.tick.bind(this)
  }

  private addMouseDownListener (): void {
    this.canvas.element.addEventListener('mouseenter', () => {
      this.isEffectApplied = true
    })
  }

  private addMouseUpListener (): void {
    this.canvas.element.addEventListener('mouseleave', () => {
      this.isEffectApplied = false
    })
  }

  private createStars () {
    for (let i = 0; i < this.STARS_COUNT; i++) {
      this.stars.push({
        x: Math.random() * this.maxSideSize - (this.maxSideSize / 2),
        y: Math.random() * this.maxSideSize - (this.maxSideSize / 2),
        r: Math.random() + this.STAR_R_MIN,
        color: this.getRandomColor()
      })
    }
  }

  private drawStars () {
    for (const star of this.stars) {
      this.canvas.context.fillStyle = star.color
      this.canvas.context.shadowColor = star.color
      this.canvas.context.shadowBlur = this.STAR_BLUR_R

      this.canvas.context.beginPath()
      this.canvas.context.arc(star.x, star.y, star.r, 0, Math.PI * 2)
      this.canvas.context.fill()
      this.canvas.context.closePath()
    }
  }

  private getRandomColor (): string {
    return `hsl(${Math.random() * 360}, 100%, 50%)`
  }

  private tick (): void {
    this.canvas.context.fillStyle = `rgba(25, 25, 112, ${this.alpha})`
    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height)

    this.canvas.context.save()
    this.canvas.context.translate(this.canvas.centerX, this.canvas.centerY)
    this.canvas.context.rotate(this.radians)
    this.drawStars()
    this.canvas.context.restore()

    this.radians += this.RADIANS_INC

    if (this.isEffectApplied && this.alpha >= this.APLHA_MIN) {
      this.alpha -= this.APLHA_INC
    } else if (!this.isEffectApplied && this.alpha < this.APLHA_MAX) {
      this.alpha += this.APLHA_INC
    }
  }

  public start (): void {
    this.canvas.startAnimation(this.tick)
  }
}
