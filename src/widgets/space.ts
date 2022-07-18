import { Canvas } from '../modules/Canvas'
import { IWidget } from './widget'

type TStart = {
  x: number,
  y: number,
  r: number,
  d: number,
}

export class Space implements IWidget {
  private readonly CLR_STAR: string = 'white'
  private readonly CLR_BG: string = 'black'
  private readonly SPEED: number = 6
  private readonly SPEED_MULTIPLIER: number = 0.8
  private readonly STAR_COUNT: number = 80
  private readonly STAR_DELAY: number = 50
  private readonly STAR_SIZE_INITIAL: number = 0
  private readonly STAR_SIZE_INCREMENT: number = 0.03
  private stars: TStart[] = []

  private canvas: Canvas

  constructor () {
    this.canvas = new Canvas('space')
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

  private drawStar ({ x, y, r }: TStart): void {
    this.canvas.context.fillStyle = this.CLR_STAR

    this.canvas.context.beginPath()
    this.canvas.context.arc(x, y, r, 0, Math.PI * 2)
    this.canvas.context.fill()
  }

  private updateStar () {
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
    this.canvas.clear()

    this.canvas.context.fillStyle = this.CLR_BG
    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height)

    for (const star of this.stars) {
      this.drawStar(star)
    }

    this.updateStar()
  }

  public start (): void {
    this.canvas.startAnimation(this.tick)
  }
}
