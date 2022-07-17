export class Canvas {
  private readonly W: number = 1000
  private readonly H: number = 500
  readonly element: HTMLCanvasElement
  readonly context: CanvasRenderingContext2D
  readonly centerX: number
  readonly centerY: number
  private animationId: number | null

  constructor (id: string) {
    this.addCanvas(id)

    this.element = <HTMLCanvasElement>document.getElementById(id)!
    this.context = this.element.getContext('2d')!
    this.centerX = this.element.width / 2
    this.centerY = this.element.height / 2
    this.animationId = null
  }

  private addCanvas (id: string) {
    const canvas = document.createElement('canvas')
    const w = this.W.toString()
    const h = this.H.toString()

    canvas.setAttribute('id', id)
    canvas.setAttribute('width', w)
    canvas.setAttribute('height', h)

    canvas.style.display = 'block'
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    canvas.style.marginLeft = 'auto'
    canvas.style.marginTop = '50px'
    canvas.style.marginBottom = '50px'
    canvas.style.marginRight = 'auto'

    document.body.appendChild(canvas)
  }

  public startAnimation (callback: () => void) {
    this.animationId = requestAnimationFrame(() => this.startAnimation(callback))
    callback()
  }

  public stopAnimation () {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  }

  public clear () {
    this.context.clearRect(0, 0, this.element.width, this.element.height)
  }
}
