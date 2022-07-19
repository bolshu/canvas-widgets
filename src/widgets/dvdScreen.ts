import { Canvas } from '../modules/Canvas'
import { IWidget } from './widget'

export class DVDScreen implements IWidget {
  private readonly CLR_BG: string = 'black'
  private readonly SPEED: number = 3
  private readonly SIZE: number = 150
  private color: string
  private x: number
  private y: number
  private dx: number
  private dy: number
  private angle: number
  private text: string

  private canvas: Canvas

  constructor () {
    this.canvas = new Canvas('dvd-screen')
    this.color = this.getRandomColor()
    this.x = this.canvas.centerX - this.SIZE / 2
    this.y = this.canvas.centerY - this.SIZE / 2
    this.angle = Math.random() * (Math.PI * 2)
    this.dx = Math.cos(this.angle) * this.SPEED
    this.dy = Math.sin(this.angle) * this.SPEED
    this.text = 'Хоба!'
    this.tick = this.tick.bind(this)
  }

  private drawSquare () {
    this.canvas.context.fillStyle = this.color
    this.canvas.context.fillRect(this.x, this.y, this.SIZE, this.SIZE)
    
    const FONT_OFFSET = 5
    this.canvas.context.fillStyle = this.CLR_BG
    this.canvas.context.fillText(this.text, this.x + this.SIZE / 2, this.y + FONT_OFFSET + this.SIZE / 2)
    this.canvas.context.font = 'italic bold 16px sans-serif'
    this.canvas.context.textAlign = 'center'
  }

  private updateSquare () {
    if (this.x <= 0 || this.x + this.SIZE >= this.canvas.element.width) {
      this.color = this.getRandomColor()
      this.text = this.getRandomText()
      this.dx *= -1
    }
    
    if (this.y <= 0 || this.y + this.SIZE >= this.canvas.element.height) {
      this.color = this.getRandomColor()
      this.text = this.getRandomText()
      this.dy *= -1
    }

    this.x += this.dx
    this.y += this.dy
  }

  private getRandomColor(): string {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
  }

  private getRandomText(): string {
    const texts = ['Написано «хуй»', 'Здарова', 'Квадрат', 'Двигается', 'Уиииии', 'Стукнулся', 'Перестань']
    const availableTexts = texts.filter((it: string) => this.text !== it)

    return availableTexts[Math.floor(availableTexts.length * Math.random())];
  }

  private tick (): void {
    this.canvas.context.fillStyle = this.CLR_BG
    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height)


    this.drawSquare()
    this.updateSquare()
  }

  public start (): void {
    this.canvas.startAnimation(this.tick)
  }
}
