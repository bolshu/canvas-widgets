import { WithCanvas } from './withCanvas'
import { IWidget } from './types'

type TStart = {
  x: number,
  y: number,
  r: number,
  d: number,
}

export class Space extends WithCanvas implements IWidget {
  private readonly CLR_STAR: string = 'white'
  private readonly BG_OPACITY: number = 0.75
  private readonly SPEED: number = 8
  private readonly SPEED_MULTIPLIER: number = 0.6
  private readonly STAR_COUNT: number = 80
  private readonly STAR_DELAY: number = 50
  private readonly STAR_SIZE_INITIAL: number = 0
  private readonly STAR_SIZE_INCREMENT: number = 0.025
  private stars: TStart[] = []

  constructor (parentNode: HTMLElement) {
    super(parentNode)

    this.createStars()
    this.tick = this.tick.bind(this)
  }

  private createStars () {
    for (let i = 0; i < this.STAR_COUNT; i++) {
      setTimeout(() => {
        this.stars.push({
          x: this.canvas.centerX,
          y: this.canvas.centerY,
          r: this.STAR_SIZE_INITIAL,
          d: Math.random() * (Math.PI * 2)
        })
      }, this.STAR_DELAY * i)
    }
  }

  private drawStars (): void {
    for (const star of this.stars) {
      this.canvas.context.fillStyle = this.CLR_STAR

      this.canvas.context.beginPath()
      this.canvas.context.arc(star.x, star.y, star.r, 0, Math.PI * 2)
      this.canvas.context.fill()
    }
  }

  private updateStars () {
    this.stars.forEach((star, index) => {
      if (
        star.x + star.r > this.canvas.element.width || star.x + star.r < 0 ||
        star.y + star.r > this.canvas.element.height || star.y + star.r < 0
      ) {
        this.stars[index] = {
          x: star.x = this.canvas.centerX,
          y: star.y = this.canvas.centerY,
          r: star.r = this.STAR_SIZE_INITIAL,
          d: Math.random() * (Math.PI * 2)
        }
      } else {
        this.stars[index] = {
          x: star.x += this.SPEED * this.SPEED_MULTIPLIER * Math.cos(star.d),
          y: star.y += this.SPEED * this.SPEED_MULTIPLIER * Math.sin(star.d),
          r: star.r += this.STAR_SIZE_INCREMENT,
          d: star.d
        }
      }
    })
  }

  private tick (): void {
    this.canvas.context.fillStyle = `rgba(0,0,0,${this.BG_OPACITY})`
    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height)

    this.drawStars()
    this.updateStars()
  }

  public start (): void {
    this.canvas.startAnimation(this.tick)
  }
}
